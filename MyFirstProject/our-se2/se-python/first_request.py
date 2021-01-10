import requests
import pandas as pd
import numpy as np
from lxml import etree
import re

#设置请求头
headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36'}

#已爬取队列  使用集合 判断是否已爬取时速度更快
alread_req = {'https://www.baidu.com/','http://tieba.baidu.com/', 'https://zhidao.baidu.com/', 'http://music.baidu.com/', 'http://image.baidu.com/', 'http://v.baidu.com/','http://map.baidu.com/', 'http://wenku.baidu.com/', 'http://news.baidu.com/'}

#已爬取标题 不重复爬取标题
title_set = set('百度一下，你就知道')

#开始爬取的起始网页
html = requests.get('http://baijiahao.baidu.com/s?id=1685579912006379153',headers=headers).text
html = etree.HTML(html)
urls = html.xpath('//a//@href')

urls = np.array(urls)
urls_bool = list(map(lambda x:len(x)>4 and x[:4]=='http',urls))
wait_req = list(urls[urls_bool])

df = pd.DataFrame()
count=0

while count<20000:
    try:
        #进行一些过滤 以防止爬取到.apk的页面导致下载页面无法结束 并且保证爬取的页面都为百度内的 不至于跳转到广告
        if wait_req[0] not in alread_req and '.apk' not in wait_req[0] and 'baidu' in wait_req[0]:
            url = wait_req[0]
        else:
            raise Exception('already')

        html = requests.get(url,headers=headers,timeout=(1,2))

        #获取网页标题及正文内容
        html = html.text
        title=re.findall('<title>(.*?)</title>',html)
        html = etree.HTML(html)
        text = html.xpath('//p//span/text()')
        text = "".join(text)

        #获取内容长度大于100 并且拥有标题且标题不重复
        if len(text)<100 or len(title[0])==0 or title[0] in title_set or '【' in title[0]:
            alread_req.add(url)
            title_set.add(title)
            raise Exception('too_short')

        #获取待爬取url 添加进待爬取队列中 并且记录当前链接的所有子链接
        urls = html.xpath('//a//@href')
        urls = np.array(urls)
        urls_bool = list(map(lambda x: len(x) > 4 and x[:4] == 'http', urls))
        urls = urls[urls_bool]
        urls_bool = list(map(lambda x: 'baidu' in x, urls))
        urls = urls[urls_bool]
        wait_req.extend(urls)

        #将当前url添加进已爬取队列中
        alread_req.add(url)
        title_set.add(title[0])

        #将文章信息添加进文件中
        df = df.append([[title[0],url,"".join(text),",".join(urls)]])

        count += 1

        print('count:',count,end='')
        print('  wait_req:',len(wait_req),'alread_req:',len(alread_req))
        #每次将待爬取队列前移一格 获取下一篇
        wait_req = wait_req[1:]

        #防止网络问题 每经过1000篇文章 进行一次保存
        if count%1000 == 0:
            wait_req = list(set(wait_req))
            df.to_csv('./data/page_{}.csv'.format(count), index=False, encoding='utf_8_sig')
    except :
        print('failed')
        wait_req = wait_req[1:]

