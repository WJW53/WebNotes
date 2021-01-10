import pandas as pd
import numpy as np
from tqdm import tqdm
import pickle
import jieba
import re
import jieba.analyse
import jieba.posseg
from snownlp import SnowNLP
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer,CountVectorizer
from textrank4zh import TextRank4Keyword, TextRank4Sentence

#通过训练集预测得到标签
# df = pd.read_csv('./data/first_requests.csv')
# vectorizer = pickle.load(open("./model/vectorizer.pickle", "rb"))
# model = pickle.load(open("./model/lgb_model.pickle", "rb"))
# df.columns = ['title','url','content','children']
# sencents = df.content
# content = []
# for sen in tqdm(sencents):
#     xx = jieba.lcut(sen)
#     content.append(",".join(xx))
# test_x = vectorizer.transform(content).toarray()
# pre = model.predict(test_x)
# df['label'] = pre
# df.to_csv('./data/second_labeled.csv',index=False,encoding='utf_8_sig')

#使用tfidf根据余弦相似度进行文本去重
#仅保留余弦相似度小于90%的文档
# df = pd.read_csv('./data/second_labeled.csv')
# sencents = df.content
# content = []
# for sen in tqdm(sencents):
#     xx = jieba.lcut(sen)
#     content.append(",".join(xx))
# vectorizer = TfidfVectorizer(min_df=15,max_df=0.85,max_features=2000)
# tfidf = vectorizer.fit_transform(content).toarray()
#
# xx = pd.DataFrame(cosine_similarity(tfidf))
# xx[xx>=0.9999] = 0
# mm = np.max(xx)
# df = df.drop(mm[mm>0.9].index)
# df.to_csv('./data/second_save_less_90percent_20000.csv',index=False,encoding='utf_8_sig')


#保存指向当前url的url下标 以及 当前url指向url的下标
# df = pd.read_csv('./data/second_save_less_90percent_20000.csv')
# row = 0
# for i in tqdm(df.children.str.split(',')):
#     try:
#         drop = 0
#         save = 0
#         urls = []
#         for n in i:
#             if n in set(df.url.values):
#                 urls.append(n)
#                 save += 1
#             else:
#                 drop += 1
#
#     except:
#         pass
#     df.loc[row,'children'] = ",".join(urls)
#     row += 1
#
# fathers = []
# for i in tqdm(df.url.values):
#     fathers.append(df[df.children.str.contains(i)].index.values)
# df['fathers'] = fathers
#
# children = []
# for i in tqdm(df.children.str.split(',')):
#     index = []
#     for n in i:
#         try:
#             index.append(df[df.url==n].index[0])
#         except:
#             pass
#     children.append(list(set(index)))
# df['children_index'] = children
#
# df.to_pickle('./data/second_link_process_20000.pkl')



#不做pagerank了
# df = pd.read_pickle('link_process_3w.pkl')
# df['children_index'] = list(map(lambda x:str(x)[1:-1],df.children_index))
# df['fathers'] = list(map(lambda x:str(x)[1:-1],df.fathers))
# print(df.children_index)



df = pd.read_pickle('./data/second_link_process_20000.pkl')

class TextSummary:
    def __init__(self, text):
        self.text = text

    def splitSentence(self):
        sectionNum = 0
        self.sentences = []
        for eveSection in self.text.split("\n"):
            if eveSection:
                sentenceNum = 0
                for eveSentence in re.split("!|。|？", eveSection):
                    if eveSentence:
                        mark = []
                        if sectionNum == 0:
                            mark.append("FIRSTSECTION")
                        if sentenceNum == 0:
                            mark.append("FIRSTSENTENCE")
                        self.sentences.append({
                            "text": eveSentence,
                            "pos": {
                                "x": sectionNum,
                                "y": sentenceNum,
                                "mark": mark
                            }
                        })
                        sentenceNum = sentenceNum + 1
                sectionNum = sectionNum + 1
                self.sentences[-1]["pos"]["mark"].append("LASTSENTENCE")
        for i in range(0, len(self.sentences)):
            if self.sentences[i]["pos"]["x"] == self.sentences[-1]["pos"]["x"]:
                self.sentences[i]["pos"]["mark"].append("LASTSECTION")

    def getKeywords(self):
        self.keywords = jieba.analyse.extract_tags(self.text, topK=20, withWeight=False, allowPOS=('n', 'vn', 'v'))

    def sentenceWeight(self):
        # 计算句子的位置权重
        for sentence in self.sentences:
            mark = sentence["pos"]["mark"]
            weightPos = 0
            if "FIRSTSECTION" in mark:
                weightPos = weightPos + 2
            if "FIRSTSENTENCE" in mark:
                weightPos = weightPos + 2
            if "LASTSENTENCE" in mark:
                weightPos = weightPos + 1
            if "LASTSECTION" in mark:
                weightPos = weightPos + 1
            sentence["weightPos"] = weightPos

        # 计算句子的线索词权重
        index = [" 总之 ", " 总而言之 "]
        for sentence in self.sentences:
            sentence["weightCueWords"] = 0
            sentence["weightKeywords"] = 0
        for i in index:
            for sentence in self.sentences:
                if sentence["text"].find(i) >= 0:
                    sentence["weightCueWords"] = 1

        for keyword in self.keywords:
            for sentence in self.sentences:
                if sentence["text"].find(keyword) >= 0:
                    sentence["weightKeywords"] = sentence["weightKeywords"] + 1

        for sentence in self.sentences:
            sentence["weight"] = sentence["weightPos"] + 2 * sentence["weightCueWords"] + sentence["weightKeywords"]

    def getSummary(self, ratio=0.1):
        self.keywords = list()
        self.sentences = list()
        self.summary = list()

        # 调用方法，分别计算关键词、分句，计算权重
        self.getKeywords()
        self.splitSentence()
        self.sentenceWeight()

        # 对句子的权重值进行排序
        self.sentences = sorted(self.sentences, key=lambda k: k['weight'], reverse=True)

        # 根据排序结果，取排名占前 ratio% 的句子作为摘要
        for i in range(len(self.sentences)):
            if i < ratio * len(self.sentences):
                sentence = self.sentences[i]
                self.summary.append(sentence["text"])

        return self.summary

count = 0
for sen in tqdm(df.content):
    testSummary = TextSummary(sen)
    tesen = TextRank4Sentence()
    tesen.analyze(text=sen,lower=True,source='all_filters')
    df.loc[count,'main_text'] = tesen.get_key_sentences(3)[0]['sentence']
    count += 1

df[['url','title','main_text','label']].to_csv('./data/tk4sen.csv',index=False,encoding='utf_8_sig')




