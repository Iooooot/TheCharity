package com.wht.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.Causes;
import com.wht.service.CausesService;
import com.wht.utils.TheCharityConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("causes")
public class CausesController {

    @Autowired
    private CausesService causesServiceImpl;

    /***
     * 获取近期慈善项目
     * @return
     */
    @GetMapping("/getRecentlyCauses")
    public ResponseEntity<List<Causes>> getRecentlyCauses(){
        //直接调用service的方法
        return causesServiceImpl.getRecentlyCauses();
    }

    /***
     * 获取特色公益
     * @return
     */
    @GetMapping("/getFeatureCauses")
    public ResponseEntity<List<Causes>> getFeatureCauses(){
        return causesServiceImpl.getFeatureCauses();
    }

    /***
     * 获取正在进行的公益
     * @return
     */
    @GetMapping("getGoingCauses")
    public ResponseEntity<List<Causes>> getGoingCauses(){
        return causesServiceImpl.getGoingCauses();
    }

    /***
     * 获取热门公益
     * @return
     */
    @GetMapping("getHotCauses")
    public ResponseEntity<List<Causes>> getHotCauses(){
        return causesServiceImpl.getHotCauses();
    }

    /***
     * 获取已经筹集的钱
     * @return
     */
    @GetMapping("getRaisedMoney")
    public ResponseEntity<Integer> getRaisedMoney(){
        return causesServiceImpl.getRaisedMoney();
    }

    /***
     * 获取已完成的项目数
     * @return
     */
    @GetMapping("getFinishedCauseNum")
    public ResponseEntity<Integer> getFinishedCauseNum(){
        return causesServiceImpl.getFinishedCauseNum();
    }

    /***
     * 分页查询慈善项目
     * @param pageNum
     * @param pageSize
     * @param keyword
     * @return
     */
    @PostMapping("getCausesPage")
    public ResponseEntity<Page<Causes>> getCausesPage(@RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum,
                                                      @RequestParam(value = "pageSize",defaultValue = "3") Integer pageSize,
                                                      @RequestParam(value = "keyword",defaultValue = "")String keyword){

        return causesServiceImpl.getCausesPage(pageNum,pageSize,keyword);
    }

    /***
     * 根据id查询项目
     * @param id
     * @return
     */
    @GetMapping("getCauseById")
    public ResponseEntity<Causes> getCauseById(Long id){
        ResponseEntity responseEntity = null;
        Causes cause = causesServiceImpl.getById(id);
        if(cause != null){
            responseEntity = ResponseEntity.successWithData(cause);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }
}
