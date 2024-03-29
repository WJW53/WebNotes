
//c语言

方法一：循环m次,每次只移动一位,m次代表m位

一、 数组循环右移

```C
#include<stdio.h>

int main() {
    int n, m, a[100], i; //n是数组的大小，m是数组要右移的位数。
    scanf("%d %d", & n, & m);
    for (i = 0; i < n; i++)
        scanf("%d", & a[i]);
    while (m--) //这个while就是循环右移的关键地方。
    {
        int temp = a[n - 1]; //这是采用从最后一个开始依次等于前一个，这样需要先把最后一个保存
        for (i = n - 1; i > 0; i--) //for循环时后一位等于前一位，然后a[0]前一位就是temp。
            a[i] = a[i - 1];
        a[0] = temp; //这样就完成了右移一位，所以while(m--)共循环m次
    }
    for (i = 0; i < n; i++) {
        if (i != n - 1)
            printf("%d ", a[i]);
        else
            printf("%d", a[i]);
    }
}
```
右移是令数组后一位等于前一位所以需要从末尾向前， 先把最后一个保留下来， 然后循环后一位等于前一位， 就相当于右移了一位，
while（ m--）就会死循环 m次就是右移了m位。

二、 循环左移
```c
#include<stdio.h>

int main() {
    int n, m, a[100], i;
    scanf("%d %d", & n, & m);
    for (i = 0; i < n; i++)
        scanf("%d", & a[i]);
    while (m--) {
        int temp = a[0]; //这是采用前一个等于后一个依次下去，这样第一个要先保留
        for (i = 0; i < n - 1; i++) //循环把前一位等于后一位
            a[i] = a[i + 1];
        a[n - 1] = temp; //最后n-1的后一位就是a[0]即temp。
    }
    for (i = 0; i < n; i++) {
        if (i != n - 1)
            printf("%d ", a[i]);
        else
            printf("%d", a[i]);
    }
}
```
循环左移要从前先后着手是前一位等于后一位即是左移， 这样的话必须先把第一位保留， 用for循环左移一位之后在把最后一位等于保留下来的第一位， 这样就相当于左移了一位。
while（ m--）就是循环m次， 这样就左移m位。，


方法二：

下面的算法，用来将数组a[n]的每个元素都循环地左移k 位，这里1≤k≤n。
算法描述如下：
步骤1） 将数组分成两段，左段长为k，右段长为n-k。
步骤2） 分别将两段逆转（即元素排列次序与原次序相反）。
步骤3） 再数组元素整体逆转。

<注1>如果是右移k位，步骤1改为“ 将数组分成两段，左段长为n-k，右段长为k。”
<注2>任一数组元素a[i]经左移算法处理后，其下标变成：(i+m)%n。相当于一开始左移m%n位。


```C
#include <stdio.h>
int main(int argc, const char *argv[])
{
    int a[101], i, j, n, m;
    scanf("%d %d", &n, &m );
    for(i=0; i<n; i++)
        scanf("%d", &a[i]);
    m = m%n;/*考虑m比n大的情况，即左移出现循环。如8位数左移10位，相当于左移2位；
　　　　　　                                    8位数左移10位，相当于左移0位。*/
    for(i=0; i<m/2; i++)         //前m个数倒序排列
    {
        j=a[(m-1)-i];
        a[(m-1)-i]=a[i];
        a[i]=j;
    }
    for(i=0; i<(n-m)/2; i++)    //后(n-m)个数倒序排列
    {
        j=a[(n-1)-i];
        a[(n-1)-i]=a[m+i];
        a[m+i]=j;
    }
    for(i=0; i<n/2; i++)        //整体再倒序排列。左移完成
    {
        j=a[(n-1)-i];
        a[(n-1)-i]=a[i];
        a[i]=j;
    }
    for(i=0; i<n-1; i++)        //输出循环左移m位以后的整数序列,之间用空格分隔，序列结尾不能有多余空格。
    {
        printf("%d ",a[i]);
    }
    printf("%d",a[n-1]);
    return 0;
}
```