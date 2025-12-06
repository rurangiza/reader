a = "hello, wolrd ## sep\n, this is incredible ## sep and nothing els ie ## sep\n 039 340304 nothing done here sep"

splits = a.split("##")
chapters = [{"title": split[:split.find("\n")], "content": split[split.find("\n"):]} for split in splits]
print(chapters)