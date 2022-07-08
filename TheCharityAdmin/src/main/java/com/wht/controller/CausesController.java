package com.wht.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.Causes;
import com.wht.domain.vo.DaysCausesVo;
import com.wht.service.CausesService;
import com.wht.utils.TheCharityConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("causes")
public class CausesController {

    @Autowired
    CausesService causesServiceImpl;
    /***
     * 获取已经筹集的资金
     * @return
     */
    @GetMapping("getRaisedAmount")
    public ResponseEntity<Integer> getRaisedAmount(){
        return causesServiceImpl.getRaisedMoney();
    }

    /***
     * 获取每日的慈善筹集数据
     * @return
     */
    @GetMapping("getDaysCharityData")
    public ResponseEntity<List<DaysCausesVo>> getDaysCharityData(){
        return causesServiceImpl.getDaysCharityData();
    }

    /***
     * 获取慈善的筹集情况
     * @return
     */
    @GetMapping("getCauseProgress")
    public ResponseEntity<List<Causes>> getCauseProgress(){
        return causesServiceImpl.getCauseProgress();
    }

    /***
     * 获取慈善活动的分页
     * @param pageNum
     * @param pageSize
     * @param keyword
     * @return
     */
    @PostMapping("getCausesPage")
    public ResponseEntity<Page<Causes>> getCausesPage(@RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum,
                                                         @RequestParam(value = "pageSize",defaultValue = "8") Integer pageSize,
                                                         @RequestParam(value = "keyword",defaultValue = "")String keyword){
        return causesServiceImpl.getCausesPage(pageNum,pageSize,keyword);
    }

    /***
     * 插入慈善活动
     * @param causes
     * @return
     */
    @PostMapping("insertCauses")
    public ResponseEntity insertCauses(Causes causes){
        ResponseEntity responseEntity = null;
        boolean flag = causesServiceImpl.save(causes);
        if(flag){
            responseEntity = ResponseEntity.successWithoutData();
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    /***
     * 根据id查询活动
     * @param id
     * @return
     */
    @GetMapping("getCauses")
    public ResponseEntity<Causes> getCauses(Long id){
        ResponseEntity<Causes> responseEntity = null;
        Causes causes = causesServiceImpl.getById(id);
        if(causes != null){
            responseEntity = ResponseEntity.successWithData(causes);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    /***
     * 更新活动信息
     * @param causes
     * @return
     */
    @PostMapping("updateCauses")
    public ResponseEntity updateCauses(Causes causes){
        ResponseEntity responseEntity = null;
        if("".equals(causes.getBigpic())){
            causes.setBigpic(null);
        }
        if("".equals(causes.getSmallpic())){
            causes.setSmallpic(null);
        }
        boolean flag = causesServiceImpl.updateById(causes);
        if(flag){
            responseEntity = ResponseEntity.successWithoutData();
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    /***
     * 根据id删除
     * @param id
     * @return
     */
    @GetMapping("delOneById")
    public ResponseEntity delOneById(Long id){
        ResponseEntity responseEntity = null;
        boolean flag = causesServiceImpl.removeById(id);
        if(flag){
            responseEntity = ResponseEntity.successWithoutData();
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    /***
     * 批量删除
     * @param arrId
     * @return
     */
    @PostMapping("delCausesById")
    public ResponseEntity delByIds(@RequestParam("arrId[]") List<Long> arrId){
        ResponseEntity responseEntity = null;
        boolean flag = causesServiceImpl.removeByIds(arrId);
        if(flag){
            responseEntity = ResponseEntity.successWithoutData();
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }
}
