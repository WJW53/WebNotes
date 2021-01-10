import pandas as pd
import numpy as np
from tqdm import tqdm
import time
import pickle
import jieba

df = pd.read_pickle('./data/second_link_process_20000.pkl')
sencents = df.content
words_dict = {}
content = []
index = 0
for sen in tqdm(sencents):
    xx = jieba.lcut_for_search(sen)
    for i in set(xx):
        if i in words_dict.keys():
            words_dict[i].add(index)
        else:
            words_dict[i] = set([index])
    index += 1

pickle.dump(words_dict, open("./data/reverse_index.pickle", "wb"))