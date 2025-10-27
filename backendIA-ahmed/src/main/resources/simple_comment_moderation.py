#!/usr/bin/env python3
"""
Simple Comment Moderation Service
This service uses rule-based detection to identify toxic content in comments.
"""

import sys
import json
import re

class SimpleCommentModerationService:
    def __init__(self):
        self.labels = ['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']
        
        # Define toxic keywords for each category
        self.toxic_keywords = {
            'toxic': ['hate', 'stupid', 'idiot', 'dumb', 'terrible', 'awful', 'horrible', 'sucks', 'worst'],
            'severe_toxic': ['kill', 'die', 'murder', 'suicide', 'destroy', 'annihilate'],
            'obscene': ['fuck', 'shit', 'damn', 'hell', 'bitch', 'asshole', 'crap', 'piss'],
            'threat': ['threat', 'kill', 'hurt', 'destroy', 'attack', 'beat', 'punch', 'stab'],
            'insult': ['idiot', 'stupid', 'moron', 'loser', 'pathetic', 'worthless', 'useless'],
            'identity_hate': ['racist', 'sexist', 'homophobic', 'nazi', 'terrorist', 'retard']
        }
    
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
    
    def is_toxic(self, comment_text):
        """
        Check if a comment is toxic using rule-based detection.
        Returns a dictionary with toxicity scores and overall decision.
        """
        try:
            # Clean the comment
            processed_text = self.clean_text(comment_text)
            
            predictions = []
            prob_scores = []
            
            # Check each category
            for label, keywords in self.toxic_keywords.items():
                found = any(keyword in processed_text for keyword in keywords)
                predictions.append(1 if found else 0)
                prob_scores.append(0.8 if found else 0.1)
            
            # Calculate overall toxicity score
            toxicity_score = sum(prob_scores) / len(prob_scores)
            
            # Consider comment toxic if any category is flagged or overall score > 0.3
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
        print(json.dumps({'error': 'Usage: python simple_comment_moderation.py <comment_text>'}))
        sys.exit(1)
    
    comment_text = sys.argv[1]
    service = SimpleCommentModerationService()
    result = service.is_toxic(comment_text)
    
    print(json.dumps(result))

if __name__ == "__main__":
    main()
