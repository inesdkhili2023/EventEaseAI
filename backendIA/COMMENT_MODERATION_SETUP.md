# Comment Moderation Setup Guide

This guide explains how to set up the comment moderation system that uses your trained ML model to automatically detect and hide toxic comments.

## Overview

The system consists of:
1. **Python ML Service**: Uses your trained Logistic Regression model to detect toxic content
2. **Java Backend**: Integrates with the Python service to moderate comments
3. **Frontend**: Displays only visible comments and provides admin interface for moderation

## Setup Instructions

### 1. Python Environment Setup

1. Install Python dependencies:
```bash
cd backendIA
pip install -r requirements.txt
```

2. Train and save your model:
```bash
# First, run your Jupyter notebook to train the model
# Then run this script to save it for production use
python src/main/resources/save_model.py
```

### 2. Test the Python Service

Test the comment moderation service:
```bash
python src/main/resources/comment_moderation_service.py "This is a great event!"
python src/main/resources/comment_moderation_service.py "This is fucking terrible"
```

### 3. Backend Integration

The Java backend is already configured to:
- Automatically moderate comments when they are created
- Hide toxic comments from public view
- Provide endpoints for admin moderation

### 4. Frontend Integration

The frontend has been updated to:
- Display only visible (non-toxic) comments in event details
- Provide an admin interface for reviewing hidden comments
- Allow admins to approve hidden comments

## API Endpoints

### Comment Moderation Endpoints

- `GET /api/comments/visible-event-comments/{idEvent}` - Get only visible comments for an event
- `GET /api/comments/hidden-comments` - Get all hidden comments (admin only)
- `PUT /api/comments/toggle-visibility/{idComment}` - Toggle comment visibility (admin only)

### Admin Interface

Access the comment moderation interface at: `/admin/comment-moderation`

## How It Works

1. **Comment Creation**: When a user submits a comment, it's automatically analyzed by the ML model
2. **Toxicity Detection**: The model checks for 6 categories: toxic, severe_toxic, obscene, threat, insult, identity_hate
3. **Automatic Hiding**: Comments flagged as toxic are automatically hidden from public view
4. **Admin Review**: Hidden comments can be reviewed and approved by administrators
5. **Public Display**: Only approved comments are shown to regular users

## Model Categories

The system detects the following types of toxic content:
- **Toxic**: General toxic language
- **Severe Toxic**: Extremely harmful content
- **Obscene**: Profanity and vulgar language
- **Threat**: Threats of violence or harm
- **Insult**: Personal attacks and insults
- **Identity Hate**: Hate speech based on identity

## Configuration

### Moderation Thresholds

You can adjust the toxicity threshold in `CommentModerationService.java`:
```java
// Consider comment toxic if any category is flagged or overall score > 0.3
is_harmful = any(predictions) or toxicity_score > 0.3
```

### Fallback Detection

If the trained model is not available, the system falls back to rule-based keyword detection.

## Troubleshooting

### Python Service Issues

1. **Model not found**: Ensure `trained_model.pkl` exists in the resources directory
2. **Import errors**: Install all required Python packages
3. **NLTK data**: The service will automatically download required NLTK data

### Java Integration Issues

1. **Python not found**: Ensure Python is in your system PATH
2. **Permission errors**: Ensure the Java process can execute Python scripts
3. **Timeout issues**: The Python service should respond within a few seconds

## Performance Considerations

- The ML model adds ~1-2 seconds to comment creation time
- Consider implementing caching for frequently used predictions
- Monitor system resources when processing high volumes of comments

## Security Notes

- The Python service runs with the same permissions as the Java application
- Consider running the ML service in a separate container for better isolation
- Validate all inputs to prevent injection attacks

## Future Enhancements

1. **Real-time Training**: Retrain the model with new data
2. **Custom Categories**: Add domain-specific toxicity categories
3. **User Feedback**: Allow users to report false positives/negatives
4. **Analytics**: Track moderation statistics and model performance

