def normalize_title(title: str):
    return f"{title}".lower().replace(" ", "_")
    # return {
    #     "original": title,
    #     "normalized": f"{title}".lower().replace(" ", "_")
    # }