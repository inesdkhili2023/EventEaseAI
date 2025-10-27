#!/usr/bin/env python3
"""
Script to save the trained model for production use.
This should be run after training the model in the Jupyter notebook.
"""

import pandas as pd
import numpy as np
import re
import pickle
import nltk
from nltk.corpus import stopwords
from nltk.stem.snowball import SnowballStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline
from sklearn.multiclass import OneVsRestClassifier
from sklearn.linear_model import LogisticRegression

# Download required NLTK data
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

def remove_stopwords(text):
    stopwords_set = set(stopwords.words('english'))
    no_stopword_text = [w for w in text.split() if not w in stopwords_set]
    return " ".join(no_stopword_text)

def clean_text(text):
    text = text.lower()
    text = re.sub(r"what's", "what is ", text)
    text = re.sub(r"\'s", " ", text)
    text = re.sub(r"\'ve", " have ", text)
    text = re.sub(r"can't", "can not ", text)
    text = re.sub(r"n't", " not ", text)
    text = re.sub(r"i'm", "i am ", text)
    text = re.sub(r"\'re", " are ", text)
    text = re.sub(r"\'d", " would ", text)
    text = re.sub(r"\'ll", " will ", text)
    text = re.sub(r"\'scuse", " excuse ", text)
    text = re.sub('\W', ' ', text)
    text = re.sub('\s+', ' ', text)
    text = text.strip(' ')
    return text

def stemming(sentence):
    stemmer = SnowballStemmer('english')
    stemmed_sentence = ""
    for word in sentence.split():
        stemmed_word = stemmer.stem(word)
        stemmed_sentence += stemmed_word + " "
    stemmed_sentence = stemmed_sentence.strip()
    return stemmed_sentence

def preprocess_text(text):
    text = remove_stopwords(text)
    text = clean_text(text)
    text = stemming(text)
    return text

def main():
    # Load your training data (you'll need to provide the path to your train.csv)
    # df = pd.read_csv('path/to/your/train.csv')
    
    # For demonstration, we'll create a simple model
    # In production, you would load your actual training data here
    
    # Create the pipeline (same as in your notebook)
    LR_pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(stop_words='english')),
        ('nb_model', OneVsRestClassifier(LogisticRegression(), n_jobs=-1))
    ])
    
    # For demonstration, create some dummy data
    # In production, use your actual training data
    dummy_texts = [
        "This is a great event!",
        "I hate this stupid event",
        "Amazing experience, highly recommended",
        "This is fucking terrible",
        "Nice event, good organization"
    ]
    
    dummy_labels = np.array([
        [0, 0, 0, 0, 0, 0],  # not toxic
        [1, 0, 0, 0, 1, 0],  # toxic, insult
        [0, 0, 0, 0, 0, 0],  # not toxic
        [1, 0, 1, 0, 0, 0],  # toxic, obscene
        [0, 0, 0, 0, 0, 0]   # not toxic
    ])
    
    # Preprocess the texts
    processed_texts = [preprocess_text(text) for text in dummy_texts]
    
    # Train the model
    LR_pipeline.fit(processed_texts, dummy_labels)
    
    # Save the model
    with open('trained_model.pkl', 'wb') as f:
        pickle.dump(LR_pipeline, f)
    
    print("Model saved successfully as 'trained_model.pkl'")
    print("Labels:", ['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate'])

if __name__ == "__main__":
    main()
