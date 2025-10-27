#!/usr/bin/env python3
"""
Test script to verify comment moderation is working
"""

import subprocess
import json

def test_comment(comment_text):
    """Test a comment and return the result"""
    try:
        result = subprocess.run([
            'python', 
            'src/main/resources/simple_comment_moderation.py', 
            comment_text
        ], capture_output=True, text=True, cwd='.')
        
        if result.returncode == 0:
            return json.loads(result.stdout)
        else:
            return {"error": result.stderr}
    except Exception as e:
        return {"error": str(e)}

def main():
    test_comments = [
        "This is a great event!",
        "fuck you",
        "I hate this stupid event",
        "Amazing experience, highly recommended",
        "This is fucking terrible",
        "Nice event, good organization"
    ]
    
    print("Testing Comment Moderation System")
    print("=" * 50)
    
    for comment in test_comments:
        result = test_comment(comment)
        print(f"\nComment: '{comment}'")
        print(f"Toxic: {result.get('is_toxic', 'ERROR')}")
        print(f"Score: {result.get('toxicity_score', 'ERROR')}")
        if 'category_scores' in result:
            flagged_categories = [cat for cat, score in result['category_scores'].items() if score == 1]
            if flagged_categories:
                print(f"Flagged categories: {', '.join(flagged_categories)}")
            else:
                print("No categories flagged")
        if 'error' in result:
            print(f"ERROR: {result['error']}")

if __name__ == "__main__":
    main()
