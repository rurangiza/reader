def normalize_title(title: str):
    return {
        "original": title,
        "normalized": f"{title}".lower().replace(" ", "_")
    }