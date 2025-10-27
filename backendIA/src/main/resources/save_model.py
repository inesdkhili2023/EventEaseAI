#!/usr/bin/env python3
"""
Enhanced Model Training Script
This script creates a more robust ML model for comment moderation
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
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score
import os

# Download required NLTK data
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

def remove_stopwords(text):
    """Remove stopwords from text."""
    stopwords_set = set(stopwords.words('english'))
    no_stopword_text = [w for w in text.split() if not w in stopwords_set]
    return " ".join(no_stopword_text)

def clean_text(text):
    """Clean and normalize text."""
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
    text = re.sub(r'\W', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    text = text.strip(' ')
    return text

def stemming(sentence):
    """Apply stemming to the sentence."""
    stemmer = SnowballStemmer('english')
    stemmed_sentence = ""
    for word in sentence.split():
        stemmed_word = stemmer.stem(word)
        stemmed_sentence += stemmed_word + " "
    stemmed_sentence = stemmed_sentence.strip()
    return stemmed_sentence

def preprocess_text(text):
    """Apply all preprocessing steps to the text."""
    text = remove_stopwords(text)
    text = clean_text(text)
    text = stemming(text)
    return text

def create_training_data():
    """Create comprehensive training data for toxicity detection."""
    
    # Expanded training data with more examples
    texts = [
        # Non-toxic examples
        "This is a great event!",
        "Amazing experience, highly recommended",
        "Nice event, good organization",
        "Wonderful time, will come again",
        "Excellent service and friendly staff",
        "Great atmosphere and good music",
        "Perfect venue and well organized",
        "Had a fantastic time, thank you",
        "Beautiful location and great food",
        "Really enjoyed the event",
        "Outstanding performance and quality",
        "Very professional and well executed",
        "Great value for money",
        "Highly recommend this event",
        "Perfect weather and great company",
        
        # Toxic examples
        "I hate this stupid event",
        "This is fucking terrible",
        "Worst event ever, complete waste",
        "This sucks big time",
        "What a fucking disaster",
        "This is absolutely horrible",
        "Terrible organization, idiots",
        "Complete garbage, hate it",
        "This is fucking awful",
        "Worst experience of my life",
        "These people are morons",
        "What a bunch of losers",
        "This event is shit",
        "Fucking terrible service",
        "Hate everything about this",
        
        # Severe toxic examples
        "I want to kill everyone here",
        "This makes me want to die",
        "Someone should destroy this place",
        "I hope everyone dies",
        "This is murder on my soul",
        "I want to destroy everything",
        "Kill all the organizers",
        "This is suicide for my wallet",
        "Destroy this fucking place",
        "Annihilate everyone involved",
        
        # Obscene examples
        "Fuck this shit",
        "Damn this is bad",
        "Hell no, this sucks",
        "Bitch please, this is awful",
        "Asshole organizers",
        "Crap service and food",
        "Piss poor management",
        "Fucking hell this is bad",
        "Shit show all around",
        "Damn fucking terrible",
        
        # Threat examples
        "I'll hurt the organizers",
        "Threat to destroy everything",
        "Attack the management",
        "Beat up the staff",
        "Punch the organizers",
        "Stab the management",
        "Hurt everyone involved",
        "Destroy the venue",
        "Attack this place",
        "Beat down the organizers",
        
        # Insult examples
        "You're all idiots",
        "Stupid morons running this",
        "Losers and pathetic people",
        "Worthless organizers",
        "Useless management",
        "Pathetic excuse for an event",
        "Idiots everywhere",
        "Morons in charge",
        "Losers running this show",
        "Pathetic performance",
        
        # Identity hate examples
        "Racist organizers",
        "Sexist management",
        "Homophobic staff",
        "Nazi-like behavior",
        "Terrorist organization",
        "Retarded management",
        "Racist policies",
        "Sexist attitudes",
        "Homophobic comments",
        "Nazi sympathizers"
    ]
    
    # Create labels for each category
    labels = []
    categories = ['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']
    
    for i, text in enumerate(texts):
        label_vector = [0, 0, 0, 0, 0, 0]
        
        # Non-toxic examples (first 15)
        if i < 15:
            pass  # All zeros
        
        # Toxic examples (15-29)
        elif i < 30:
            label_vector[0] = 1  # toxic
        
        # Severe toxic examples (30-39)
        elif i < 40:
            label_vector[0] = 1  # toxic
            label_vector[1] = 1  # severe_toxic
        
        # Obscene examples (40-49)
        elif i < 50:
            label_vector[0] = 1  # toxic
            label_vector[2] = 1  # obscene
        
        # Threat examples (50-59)
        elif i < 60:
            label_vector[0] = 1  # toxic
            label_vector[3] = 1  # threat
        
        # Insult examples (60-69)
        elif i < 70:
            label_vector[0] = 1  # toxic
            label_vector[4] = 1  # insult
        
        # Identity hate examples (70-79)
        elif i < 80:
            label_vector[0] = 1  # toxic
            label_vector[5] = 1  # identity_hate
        
        labels.append(label_vector)
    
    return texts, np.array(labels)

def main():
    """Main function to train and save the model."""
    print("Creating training data...")
    texts, labels = create_training_data()
    
    print(f"Training data created: {len(texts)} examples")
    print(f"Categories: {['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']}")
    
    # Preprocess texts
    print("Preprocessing texts...")
    processed_texts = [preprocess_text(text) for text in texts]
    
    # Create and train the model
    print("Training model...")
    LR_pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(
            stop_words='english',
            max_features=10000,
            ngram_range=(1, 2),
            min_df=1,
            max_df=0.8
        )),
        ('clf', OneVsRestClassifier(LogisticRegression(
            random_state=42,
            max_iter=1000,
            C=1.0
        ), n_jobs=-1))
    ])
    
    # Split data for evaluation
    X_train, X_test, y_train, y_test = train_test_split(
        processed_texts, labels, test_size=0.2, random_state=42
    )
    
    # Train the model
    LR_pipeline.fit(X_train, y_train)
    
    # Evaluate the model
    print("Evaluating model...")
    y_pred = LR_pipeline.predict(X_test)
    
    # Calculate AUC scores
    auc_scores = []
    for i, category in enumerate(['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']):
        if len(np.unique(y_test[:, i])) > 1:  # Check if both classes exist
            auc = roc_auc_score(y_test[:, i], y_pred[:, i])
            auc_scores.append(auc)
            print(f"{category} AUC: {auc:.3f}")
    
    print(f"Average AUC: {np.mean(auc_scores):.3f}")
    
    # Save the model
    model_path = 'trained_model.pkl'
    with open(model_path, 'wb') as f:
        pickle.dump(LR_pipeline, f)
    
    print(f"Model saved successfully as '{model_path}'")
    print("Model is ready for use in comment moderation!")
    
    # Test the model with some examples
    print("\nTesting model with sample comments:")
    test_comments = [
        "This is a great event!",
        "I hate this stupid event",
        "This is fucking terrible",
        "I want to kill everyone here"
    ]
    
    categories = ['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']
    
    for comment in test_comments:
        processed = preprocess_text(comment)
        prediction = LR_pipeline.predict([processed])[0]
        proba = LR_pipeline.predict_proba([processed])[0]
        
        print(f"\nComment: '{comment}'")
        print(f"Prediction: {prediction}")
        print(f"Categories flagged: {[categories[i] for i, val in enumerate(prediction) if val == 1]}")
        # Calculate max probability across all categories
        max_prob = 0.0
        for probs in proba:
            if hasattr(probs, '__iter__'):
                max_prob = max(max_prob, max(probs))
            else:
                max_prob = max(max_prob, probs)
        print(f"Max probability: {max_prob:.3f}")

if __name__ == "__main__":
    main()

