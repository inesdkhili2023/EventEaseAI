#!/usr/bin/env python3
"""
Comment Moderation Service
This service uses a trained ML model to detect toxic content in comments.
"""

import sys
import json
import pickle
import re
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

class CommentModerationService:
    def __init__(self):
        self.stopwords = set(stopwords.words('english'))
        self.stemmer = SnowballStemmer('english')
        self.labels = ['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']
        self.model = None
        self.load_model()
    
    def load_model(self):
        """Load the trained model."""
        try:
            # Try to load the saved model
            with open('trained_model.pkl', 'rb') as f:
                self.model = pickle.load(f)
            print("Loaded trained model successfully")
        except FileNotFoundError:
            print("Trained model not found, using fallback detection")
            self.model = None
    
    def remove_stopwords(self, text):
        """Remove stopwords from text."""
        no_stopword_text = [w for w in text.split() if not w in self.stopwords]
        return " ".join(no_stopword_text)
    
    def clean_text(self, text):
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
    
    def stemming(self, sentence):
        """Apply stemming to the sentence."""
        stemmed_sentence = ""
        for word in sentence.split():
            stemmed_word = self.stemmer.stem(word)
            stemmed_sentence += stemmed_word + " "
        stemmed_sentence = stemmed_sentence.strip()
        return stemmed_sentence
    
    def preprocess_text(self, text):
        """Apply all preprocessing steps to the text."""
        text = self.remove_stopwords(text)
        text = self.clean_text(text)
        text = self.stemming(text)
        return text
    
    def is_toxic(self, comment_text):
        """
        Check if a comment is toxic.
        Returns a dictionary with toxicity scores and overall decision.
        """
        try:
            # Preprocess the comment
            processed_text = self.preprocess_text(comment_text)
            
            if self.model is not None:
                # Use the trained model
                predictions = self.model.predict([processed_text])[0]
                pred_probs = self.model.predict_proba([processed_text])[0]
                
                # Get probability scores for each category
                prob_scores = [max(probs) for probs in pred_probs]
                
                # Calculate overall toxicity score
                toxicity_score = sum(prob_scores) / len(prob_scores)
                
                # Consider comment toxic if any category is flagged or overall score > 0.3
                is_harmful = any(predictions) or toxicity_score > 0.3
                
            else:
                # Fallback to rule-based detection
                toxic_keywords = {
                    'toxic': ['hate', 'stupid', 'idiot', 'dumb', 'terrible', 'awful', 'horrible'],
                    'severe_toxic': ['kill', 'die', 'murder', 'suicide'],
                    'obscene': ['fuck', 'shit', 'damn', 'hell', 'bitch', 'asshole'],
                    'threat': ['threat', 'kill', 'hurt', 'destroy', 'attack'],
                    'insult': ['idiot', 'stupid', 'moron', 'loser', 'pathetic'],
                    'identity_hate': ['racist', 'sexist', 'homophobic', 'nazi', 'terrorist']
                }
                
                predictions = []
                prob_scores = []
                
                for label, keywords in toxic_keywords.items():
                    found = any(keyword in processed_text.lower() for keyword in keywords)
                    predictions.append(1 if found else 0)
                    prob_scores.append(0.8 if found else 0.1)
                
                toxicity_score = sum(prob_scores) / len(prob_scores)
                is_harmful = any(predictions) or toxicity_score > 0.3
            
            result = {
                'is_toxic': is_harmful,
                'toxicity_score': toxicity_score,
                'category_scores': dict(zip(self.labels, predictions)),
                'processed_text': processed_text
            }
            
            return result
            
        except Exception as e:
            # If there's an error, default to not toxic
            return {
                'is_toxic': False,
                'toxicity_score': 0.0,
                'category_scores': dict(zip(self.labels, [0] * len(self.labels))),
                'error': str(e)
            }

def main():
    """Main function to handle command line input."""
    if len(sys.argv) != 2:
        print(json.dumps({'error': 'Usage: python comment_moderation_service.py <comment_text>'}))
        sys.exit(1)
    
    comment_text = sys.argv[1]
    service = CommentModerationService()
    result = service.is_toxic(comment_text)
    
    print(json.dumps(result))

if __name__ == "__main__":
    main()
