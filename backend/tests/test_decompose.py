import pytest
from app.services.decompose import decompose_goal
from unittest.mock import patch, MagicMock


def test_decompose_goal_without_api_key():
    result = decompose_goal("Learn Python")
    
    assert len(result) >= 1
    assert "Learn Python" in result[0].description
    assert result[0].duration_min > 0


@patch('app.services.decompose.OpenAI')
def test_decompose_goal_with_llm(mock_openai):
    mock_client = MagicMock()
    mock_openai.return_value = mock_client
    
    mock_response = MagicMock()
    mock_response.choices[0].message.content = '''[
        {
            "description": "Set up Python environment",
            "duration_min": 30,
            "energy_level": "low",
            "dependencies": []
        },
        {
            "description": "Complete basic tutorial",
            "duration_min": 60,
            "energy_level": "medium",
            "dependencies": [0]
        }
    ]'''
    mock_client.chat.completions.create.return_value = mock_response
    
    import app.services.decompose as decompose_module
    original_key = decompose_module.settings.openai_api_key
    decompose_module.settings.openai_api_key = "test-key"
    
    try:
        result = decompose_goal("Learn Python")
        
        assert len(result) == 2
        assert result[0].description == "Set up Python environment"
        assert result[0].duration_min == 30
        assert result[1].description == "Complete basic tutorial"
    finally:
        decompose_module.settings.openai_api_key = original_key


def test_decompose_goal_structure():
    result = decompose_goal("Build a web app")
    
    for action in result:
        assert hasattr(action, 'description')
        assert hasattr(action, 'duration_min')
        assert hasattr(action, 'energy_level')
        assert hasattr(action, 'dependencies')
        assert action.energy_level in ['low', 'medium', 'high']
