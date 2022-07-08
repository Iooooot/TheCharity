package com.wht.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.Causes;
import com.wht.domain.vo.DaysCausesVo;
import com.wht.mapper.CausesMapper;
import com.wht.service.CausesService;
import com.wht.utils.TheCharityConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * 慈善项目表(Causes)表服务实现类
 *
 * @author makejava
 * @since 2022-04-18 20:41:15
 */
@Service("causesService")
public class CausesServiceImpl extends ServiceImpl<CausesMapper, Causes> implements CausesService {
    @Autowired
    CausesMapper causesMapper;

    @Override
    public ResponseEntity<List<Causes>> getRecentlyCauses() {
        ResponseEntity<List<Causes>> responseEntity = null;
        //按照日期降序排列并只要前3个
        //创建条件构造器排序
        LambdaQueryWrapper<Causes> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.orderByDesc(Causes::getCreateTime);
        //分页只要前3条
        Page<Causes> causesPage = page(new Page<>(1, 3, 3), queryWrapper);
        List<Causes> causes = causesPage.getRecords();
        //返回结果
        if(causes != null && !causes.isEmpty()){
            responseEntity = ResponseEntity.successWithData(causes);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    @Override
    public ResponseEntity<List<Causes>> getFeatureCauses() {
        ResponseEntity<List<Causes>> responseEntity = null;
        //查询状态为2特色公益的两个慈善项目
        Page<Causes> causesPage = page(new Page<Causes>(1, 2), new LambdaQueryWrapper<Causes>().eq(Causes::getType, TheCharityConst.ATTR_NAME_FEATURE_CAUSE));
        List<Causes> causes = causesPage.getRecords();
        //返回结果
        if(causes != null && !causes.isEmpty()){
            responseEntity = ResponseEntity.successWithData(causes);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    @Override
    public ResponseEntity<List<Causes>> getGoingCauses() {
        ResponseEntity<List<Causes>> responseEntity = null;
        ArrayList<Causes> causes = new ArrayList<>();
        //查询raise != goal 的项目
        List<Causes> list = list();
        for (Causes cause : list) {
            if(Integer.compare(cause.getRaised(),cause.getGoal()) != 0){
                causes.add(cause);
            }
        }
        //返回结果
        if(causes != null && !causes.isEmpty()){
            responseEntity = ResponseEntity.successWithData(causes);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    @Override
    public ResponseEntity<List<Causes>> getHotCauses() {
        ResponseEntity<List<Causes>> responseEntity = null;
        //查询状态为3热门公益
        Page<Causes> causesPage = page(new Page<Causes>(1, 3), new LambdaQueryWrapper<Causes>().eq(Causes::getType, TheCharityConst.ATTR_NAME_HOT_CAUSE));
        List<Causes> causes = causesPage.getRecords();
        //返回结果
        if(causes != null && !causes.isEmpty()){
            responseEntity = ResponseEntity.successWithData(causes);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    @Override
    public ResponseEntity<Integer> getRaisedMoney() {
        ResponseEntity<Integer> responseEntity = null;
        //查询
        Integer sum = 0;
        sum = causesMapper.selectRaisedMoney();
        //返回结果
        if(sum >= 0){
            responseEntity = ResponseEntity.successWithData(sum);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    @Override
    public ResponseEntity<Integer> getFinishedCauseNum() {
        ResponseEntity<Integer> responseEntity = null;
        //查询
        Integer sum = 0;
        sum = causesMapper.selectFinishedCauseNum();
        //返回结果
        if(sum >= 0){
            responseEntity = ResponseEntity.successWithData(sum);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    @Override
    public ResponseEntity<Page<Causes>> getCausesPage(Integer pageNum, Integer pageSize, String keyword) {
        ResponseEntity<Page<Causes>> responseEntity = null;
        Page<Causes> causesPage = null;
        //分页查询
        //如果有查询条件
        if(!"".equals(keyword)){
            LambdaQueryWrapper<Causes> queryWrapper = new LambdaQueryWrapper<>();
            //根据查询条件查询(标题、作者、创建时间、项目摘要)
            queryWrapper.like(Causes::getTitle,keyword).or().like(Causes::getAuthor,keyword).or()
                    .like(Causes::getCreateTime,keyword).or().like(Causes::getSummary,keyword);
            causesPage = page(new Page<>(pageNum, pageSize), queryWrapper);
        }else{
            causesPage = page(new Page<>(pageNum, pageSize));
        }

        //返回结果
        if(causesPage != null){
            responseEntity = ResponseEntity.successWithData(causesPage);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    @Override
    public ResponseEntity<List<DaysCausesVo>> getDaysCharityData() {
        ResponseEntity<List<DaysCausesVo>> responseEntity = null;
        //首先获取近日日期
        LocalDate now = LocalDate.now();
        ArrayList<DaysCausesVo> daysCausesVos = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            //从近日开始往前统计10天
            LocalDate date = now.minusDays(i);
            //获取当天的筹集资金数
            Double sum = causesMapper.getTodayCausesRaised(date.toString());
            if(sum == null){
                sum = 0.0;
            }
            //添加进list
            daysCausesVos.add(new DaysCausesVo(date,sum));
        }
        //返回数据
        if(daysCausesVos.size() > 0){
            responseEntity = ResponseEntity.successWithData(daysCausesVos);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    @Override
    public ResponseEntity<List<Causes>> getCauseProgress() {
        ResponseEntity<List<Causes>> responseEntity = null;
        //分页查询
        Page<Causes> causesPage = page(new Page<Causes>(1, 6), new LambdaQueryWrapper<Causes>().orderByDesc(Causes::getCreateTime));
        List<Causes> records = causesPage.getRecords();
        if(records != null && records.size() > 0){
            responseEntity = ResponseEntity.successWithData(records);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }

        return responseEntity;
    }


}
