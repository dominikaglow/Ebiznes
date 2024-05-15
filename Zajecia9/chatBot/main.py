import replicate

for event in replicate.stream(
    "meta/llama-2-70b-chat",
    input={
        "prompt": "example message?"
    },
):
    print(str(event), end="")
    