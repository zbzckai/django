# -*- coding: utf-8 -*-
# @Time    : 2019\3\8 0008 11:09
# @Author  : 凯
# @File    : data_static.py
import pandas as pd
teacher = pd.read_csv("./static/data/1_teacher.csv")
student_info = pd.read_csv("./static/data/2_student_info.csv")
kaoqin = pd.read_csv("./static/data/3_kaoqin.csv")
kaoqin_type = pd.read_csv("./static/data/4_kaoqintype.csv")
chengji = pd.read_csv("./static/data/5_chengji.csv")
exam_type = pd.read_csv("./static/data/6_exam_type.csv")
consumption = pd.read_csv("./static/data/7_consumption.csv")
chengji.rename(index = str,columns = {'mes_StudentID':'bf_StudentID'},inplace=True)
student_chengji = student_info.merge(chengji,on ="bf_StudentID" ,how="left")
student_chengji['mes_Score'] = student_chengji['mes_Score'].astype(float)
student_chengji = student_chengji[~student_chengji.mes_Score.isnull()]
dim_sub_info = chengji[['mes_sub_id', 'mes_sub_name']][~chengji['mes_sub_id'].duplicated()]
dim_sub_info = dim_sub_info[~dim_sub_info.mes_sub_name.isnull()]
dim_sub_info = dim_sub_info.to_csv('./static/data/dim_sub_info.csv')

##学生的基础信息
def student_select(StudentID=15672,StudentName='丁某某',mes_sub_name='物理'):
    StudentID = StudentID
    StudentName = student_info[student_info.bf_StudentID == 15672]['bf_Name'].values[0]
    mes_sub_name = mes_sub_name
    student_info.columns
    list_student_basisinfo = student_info[student_info['bf_StudentID'] == StudentID]
    ##学生成绩分析
    user_1 = student_chengji[student_chengji['bf_StudentID'] == StudentID]
    user_1_everysub = user_1[user_1.mes_sub_name ==
                             mes_sub_name][['mes_TestID', 'exam_numname'
        , 'mes_T_Score']].sort_values(by='mes_TestID')

    return user_1_everysub
if __name__ == '__main__':
    aa = student_select()
    list(aa.exam_numname)



