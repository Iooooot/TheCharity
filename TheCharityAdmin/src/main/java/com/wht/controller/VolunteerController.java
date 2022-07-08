package com.wht.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.Volunteer;
import com.wht.service.VolunteerService;
import com.wht.utils.TheCharityConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("volunteer")
public class VolunteerController {

    @Autowired
    VolunteerService volunteerServiceImpl;

    /***
     * 获取志愿者人数
     * @return
     */
    @GetMapping("getVolunteerNum")
    public ResponseEntity<Integer> getVolunteerNum(){
        return volunteerServiceImpl.getVolunteerNum();
    }

    /***
     * 分页查询志愿者
     * @param pageNum
     * @param pageSize
     * @param keyword
     * @return
     */
    @PostMapping("getVolunteerPage")
    public ResponseEntity<Page<Volunteer>> getVolunteerPage(@RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum,
                                                            @RequestParam(value = "pageSize",defaultValue = "8") Integer pageSize,
                                                            @RequestParam(value = "keyword",defaultValue = "")String keyword){
        return volunteerServiceImpl.getVolunteerPage(pageNum,pageSize,keyword);
    }

    /***
     * 根据id查询志愿者
     * @param id
     * @return
     */
    @GetMapping("getVolunteer")
    public ResponseEntity<Volunteer> getVolunteer(Long id){
        ResponseEntity responseEntity = null;
        Volunteer volunteer = volunteerServiceImpl.getById(id);
        if(volunteer != null){
            responseEntity = ResponseEntity.successWithData(volunteer);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    /***
     * 插入志愿者信息
     * @param volunteer
     * @return
     */
    @PostMapping("insertVolunteer")
    public ResponseEntity insertVolunteer(Volunteer volunteer){
        ResponseEntity responseEntity = null;
        boolean flag = volunteerServiceImpl.save(volunteer);
        if(flag){
            responseEntity = ResponseEntity.successWithoutData();
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    /***
     * 更新志愿者信息
     * @param volunteer
     * @return
     */
    @PostMapping("updateVolunteer")
    public ResponseEntity updateVolunteer(Volunteer volunteer){
        ResponseEntity responseEntity = null;
        boolean flag = volunteerServiceImpl.updateById(volunteer);
        if(flag){
            responseEntity = ResponseEntity.successWithoutData();
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    /***
     * 删除志愿者
     * @param id
     * @return
     */
    @GetMapping("delOneById")
    public ResponseEntity delOneById(Long id){
        ResponseEntity responseEntity = null;
        boolean flag = volunteerServiceImpl.removeById(id);
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
    @PostMapping("delVolunteersById")
    public ResponseEntity delByIds(@RequestParam("arrId[]") List<Long> arrId){
        ResponseEntity responseEntity = null;
        boolean flag = volunteerServiceImpl.removeByIds(arrId);
        if(flag){
            responseEntity = ResponseEntity.successWithoutData();
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }
}
