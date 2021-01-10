import pickle
import numpy as np
import pandas as pd
import jieba
import time
import json

reverse_index = pickle.load(open("./data/reverse_index.pickle", "rb"))
all_text = pd.read_csv('./data/main_text.csv')
def query(quetions):
    query_word = jieba.lcut_for_search(quetions)
    indexs = set()
    for word in query_word:
        indexs.update(reverse_index[word])

    # 摘要-40% 正文-25% 标题-35%
    # 匹配的词数
    find = all_text.loc[indexs]

    df = pd.DataFrame()
    score = [0]
    match_words = [0]
    for word in query_word:
        match_words += find.content.str.contains(word).astype(int)
        score += (find.title.str.count(word) / find.title.str.len()) * 0.35
        score += (find.content.str.count(word) / find.content.str.len()) * 0.25
        score += (find.main_text.str.count(word) / find.main_text.str.len()) * 0.4
    df['match_words'] = match_words
    df['score'] = score
    df['indexs'] = df.index

    df = df.sort_values(['match_words', 'score'], ascending=False)
    df['top'] = range(df.shape[0])
    return df.indexs

# #将排序好的文章搜索出来
# indexs = query('中国国防部')
# find_text = all_text.loc[indexs]
# print(list(map(lambda url,main_text,title:[url,main_text[:40],title],find_text.url,find_text.main_text,find_text.title)))

indexs = query('中国国防部')
find_text = all_text.loc[indexs]
print(json.dumps(list(map(lambda url, main_text, title, id: {'url': url, 'main_text': main_text[:40], 'title': title, 'id': id},find_text.url, find_text.main_text, find_text.title, find_text.index))))
