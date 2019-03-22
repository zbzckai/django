# -*- coding: utf-8 -*-
# @Time    : 2019\3\8 0008 11:09
# @Author  : 凯
# @File    : data_static.py
import pandas as pd
import numpy as np
from datetime import datetime
import os
dir_path = os.getcwd()
dir_path
teacher = pd.read_csv(os.path.join(dir_path,"static\\data\\1_teacher.csv"))
student_info = pd.read_csv(os.path.join(dir_path,"static/data/2_student_info.csv"))
student_info = student_info.fillna(0)
kaoqin = pd.read_csv("static/data/3_kaoqin.csv")

kaoqin_type = pd.read_csv(os.path.join(dir_path,"static/data/4_kaoqintype.csv"))
chengji = pd.read_csv(os.path.join(dir_path,"static/data/5_chengji.csv"))
exam_type = pd.read_csv(os.path.join(dir_path,"static/data/6_exam_type.csv"))
consumption = pd.read_csv(os.path.join(dir_path,"static/data/7_consumption.csv"))
consumption['DealTime'] = pd.to_datetime(consumption.DealTime.apply(lambda x: x[0:9]))
consumption['DealTime_days'] = (consumption.DealTime - datetime.strptime('2018-07-01', "%Y-%m-%d")).apply(
    lambda x: x.days)
consumption['MonDeal'] = -consumption.MonDeal
chengji.rename(index=str, columns={'mes_StudentID': 'bf_StudentID'}, inplace=True)
student_chengji = student_info.merge(chengji, on="bf_StudentID", how="left")
student_chengji['mes_Score'] = student_chengji['mes_Score'].astype(float)
student_chengji = student_chengji[~student_chengji.mes_Score.isnull()]
dim_sub_info = chengji[['mes_sub_id', 'mes_sub_name']][~chengji['mes_sub_id'].duplicated()]
dim_exam_info = chengji[['exam_numname', 'exam_number']][~chengji['exam_number'].duplicated()]
dim_class_info = student_info[['cla_Name', 'cla_id', 'cla_term']][~student_info.cla_id.duplicated()]
dim_sub_info = dim_sub_info[~dim_sub_info.mes_sub_name.isnull()]
dim_sub_info.to_csv(os.path.join(dir_path,"static/data/dim_sub_info.csv"))
cla_name = list(dim_class_info['cla_Name'].values)
student_chengji['exam_name_subname'] = student_chengji['exam_numname'] + "_" + student_chengji['mes_sub_name']
# 增加成绩的排序
student_chengji['mes_Score_rank'] = student_chengji['mes_Score'].groupby(student_chengji["exam_name_subname"]).rank(
    ascending=0, method='dense')
##学生的消费信息结合学生的用户画像信息

student_consumption_info = consumption.groupby(by=['bf_StudentID', 'DealTime_days'], as_index=False)['MonDeal'].sum()
student_consumption_info.columns

student_consumption_info = student_consumption_info.merge(
    student_info[['bf_StudentID', 'bf_sex', 'cla_Name', 'bf_zhusu']], on='bf_StudentID', how='left')
student_consumption_info['days_7'] = np.ceil((student_consumption_info.DealTime_days + 1) / 7)
student_consumption_info = student_consumption_info[(student_consumption_info.MonDeal<=60) & (~student_consumption_info.days_7.isin([14,18,22]))]
user_consumption_info = student_consumption_info.groupby(by=['bf_StudentID', 'days_7'], as_index=False)['MonDeal'].agg(
    {'bf_StudentID_mean': 'mean'})
sex_consumption_info = student_consumption_info.groupby(by=['bf_sex', 'days_7'], as_index=False)['MonDeal'].agg(
    {'bf_sex_mean': 'mean'})
zhusu_consumption_info = student_consumption_info.groupby(by=['bf_zhusu', 'days_7'], as_index=False)['MonDeal'].agg(
    {'bf_zhusu_mean': 'mean'})
class_consumption_info = student_consumption_info.groupby(by=['cla_Name', 'days_7'], as_index=False)['MonDeal'].agg(
    {'cla_Name_mean': 'mean'})
user_consumption_info.shape
StudentID = 15672
student_info.columns

sex_consumption_info = sex_consumption_info[~sex_consumption_info.days_7.isin([1, 7, 8])]
sex_consumption_info_girl = sex_consumption_info[sex_consumption_info.bf_sex == "女"]
sex_consumption_info_boy = sex_consumption_info[sex_consumption_info.bf_sex == "男"]
zhusu_consumption_info_no = zhusu_consumption_info[zhusu_consumption_info.bf_zhusu == 0]
zhusu_consumption_info_yes = zhusu_consumption_info[zhusu_consumption_info.bf_zhusu == 1]
class_consumption_info = class_consumption_info.pivot(index='days_7', columns='cla_Name', values='cla_Name_mean')
class_consumption_info = pd.DataFrame(class_consumption_info).reset_index()




def student_consumption_desc(StudentID=15672):
    use_class_name = student_info[student_info.bf_StudentID == StudentID].cla_Name.values[0]
    user_one = user_consumption_info[user_consumption_info.bf_StudentID == StudentID]
    user_one_consumption = sex_consumption_info_girl.merge(sex_consumption_info_boy, on='days_7', how='left').merge(
        zhusu_consumption_info_no,
        on='days_7', how='left').merge(
        zhusu_consumption_info_yes, on='days_7', how='left').merge(
        class_consumption_info[['days_7', use_class_name]], on='days_7', how='left').merge(
        user_one[['days_7', 'bf_StudentID_mean']], on='days_7', how='left')
    user_one_consumption.columns = ['bf_sex_x', '7天消费', '女生消费', 'bf_sex_y', '男生消费',
                                    'bf_zhusu_x', '非住宿消费', 'bf_zhusu_y', '住宿消费',
                                    '班级消费', '学生消费'
                                    ]
    user_one_consumption = user_one_consumption[[x for x in user_one_consumption.columns if '消费' in x]]
    consumption_1_series = []
    kind_all = []
    for columns_name in user_one_consumption.columns[1:]:
        temp = list(user_one_consumption[columns_name])
        temp_1 = {
            'name': columns_name,
            'type': 'line',
            'data': temp
        }
        kind_all.append(columns_name)
        consumption_1_series.append(temp_1)  ##学生的基础信息
    return consumption_1_series,kind_all,list(user_one_consumption['7天消费'])


def student_info_desc(StudentID=15672):
    StudentID = StudentID
    try:
        student_info.columns
        list_student_basisinfo = student_info[student_info['bf_StudentID'] == StudentID]
        list_student_basisinfo = list_student_basisinfo.fillna(0)
        all_cla_name = cla_name
    except:
        return 0, 0
    return list_student_basisinfo, all_cla_name


def student_info_chengji(StudentID=15672, mes_sub_name='物理', score='mes_Score'):
    StudentID = StudentID
    mes_sub_name = mes_sub_name
    print('是否变化:'+str(StudentID))
    try:
        ##学生成绩分析
        student_chengji.columns
        user_1 = student_chengji[(student_chengji['bf_StudentID'] == StudentID) & (
            ~student_chengji['exam_type'].isin([22, 4, 18, 11, 5, 13, 14, 16]))]
        user_1_everysub = user_1[
            ['bf_StudentID', 'mes_TestID', 'mes_sub_name', 'exam_numname', 'exam_number', score]].sort_values(
            by=['exam_numname', 'mes_TestID']).reset_index()
        user_1_everysub = user_1_everysub.loc[(~user_1_everysub.mes_sub_name.isnull())]
        user_1_everysub = pd.DataFrame(
            user_1_everysub.pivot(index='exam_numname', columns='mes_sub_name', values=score))
        user_1_everysub = user_1_everysub.merge(dim_exam_info, on='exam_numname', how='left')
        user_1_everysub = user_1_everysub.sort_values(by='exam_number').reset_index(drop=True)
        exam_name = list(user_1_everysub.exam_numname.values)
        table_1_series = []
        subject_all = []
        for subject in ['政治', '技术', '数学', '语文', '英语', '地理', '历史', '物理', '化学', '生物', '音乐',
                        '体育', '通用技术', '美术', '1B模块总分', '信息技术']:
            if subject in user_1_everysub.columns:
                temp = user_1_everysub[subject]
                temp = temp.fillna(np.mean(temp))
                print(subject)
                temp_1 = {
                    'name': subject,
                    'type': 'line',
                    'data': list(temp)
                }
                subject_all.append(subject)

                table_1_series.append(temp_1)
    except:
        return 0
    return table_1_series, subject_all, exam_name


if __name__ == '__main__':
    ceshi = student_info_desc()
    ceshi.values[0][0]
    ceshi.values[0][1]
    ceshi.fillna(0)
    aa = student_info_chengji(StudentID=16152)[0]
    # {
    #             name:MyViewVar.ceshi.legend[0],
    #             type:'line',
    #             stack: '总量',
    #             data:MyViewVar.ceshi.series[0].site
    #         }

    bb = pd.DataFrame(aa.pivot(index='exam_numname', columns='mes_sub_name', values='mes_Score'))
    bb = bb.merge(dim_exam_info, on='exam_numname', how='left')
    bb = bb.sort_values(by='exam_number').reset_index(drop=True)
    bb.语文.fillna(np.mean(bb.语文))
    list(bb.语文)
    table_1_series = []
    subject_all = []
    list(bb.exam_numname.values)

    [['bf_StudentID',
      'bf_Name',
      'bf_sex',
      'bf_nation',
      'bf_BornDate',
      'cla_Name',
      'bf_NativePlace',
      'Bf_ResidenceType',
      'bf_policy',
      'cla_id',
      'cla_term',
      'bf_zhusu',
      'bf_leaveSchool',
      'bf_qinshihao']]
    ['学生ID'
        , '学生姓名'
        , '性别'
        , '民族'
        , '出生日期'
        , '班级名'
        , '家庭住址'
        , '家庭类型'
        , '政治面貌'
        , '班级ID'
        , '班级学期'
        , '是否住校'
        , '是否退学'
        , '宿舍号']

    bb.bf_Name.values[0]

    #
    # series: [
    #         {
    #             name:MyViewVar.ceshi.legend[0],
    #             type:'line',
    #             stack: '总量',
    #             data:MyViewVar.ceshi.series[0].site
    #         },
    #         {
    #             name:MyViewVar.ceshi.legend[1],
    #             type:'line',
    #             stack: '总量',
    #             data:MyViewVar.ceshi.series[0].author
    #         }
    #     ]
