import json
import requests

class Tools:
    def __init__(self):
        pass

    def get_weather(self, latitude: str, longitude: str) -> str:
        """This is a publically available API that returns the weather for a given location."""
        base_url = "https://api.open-meteo.com/v1/forecast"
        query_params = "&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"
        response = requests.get(
            f"{base_url}?latitude={latitude}&longitude={longitude}{query_params}",
            timeout=10
        )
        data = response.json()
        return data["current"]

    def _call_function(self, name, args):
        match name:
            case "GetWeather":
                return self.get_weather(**args)
    
    def _call_tool(self, messages, new_message):

        for tool_call in new_message.tool_calls:
            name = tool_call.function.name
            args = json.loads(tool_call.function.arguments)
            messages.append(new_message)

            result = self._call_function(name, args)
            messages.append(
                {
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "content": tool_call.content
                }
            )