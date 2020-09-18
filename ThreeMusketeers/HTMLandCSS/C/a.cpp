#include<stdio.h>
#include <iostream>
using namespace std;
int main(){
    printf("Hello World!\n");
    int a=10;
    int b=a;
    a=20;
    printf("%d\n",b);
    printf("%d %d\n",a++,--a);
    return 0;
}