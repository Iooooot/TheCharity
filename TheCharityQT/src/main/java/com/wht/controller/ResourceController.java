package com.wht.controller;


import com.wht.domain.ResponseEntity;
import com.wht.utils.TheCharityConst;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.UUID;

@RestController
@RequestMapping("resource")
public class ResourceController {


    @PostMapping("/uploadResource")
    public ResponseEntity<String> uploadResource(@RequestParam("file") MultipartFile[] files, HttpServletRequest request){
        ResponseEntity<String> responseEntity = null;
        MultipartFile upload = files[0];
        // 获取到上传文件的名称
        String filename = upload.getOriginalFilename();
        String uuid = UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
        // 把文件的名称唯一化
        filename = uuid+"_"+filename;
        // 先获取到要上传的文件目录

        String serverPath= null;
        try {
            //获取 SpringBoot 工程中 static 的绝对路径
            serverPath = ResourceUtils.getURL("classpath:static").getPath();
            String realPath= serverPath.replace("%20"," ").replace('/', '\\').substring(1) + "\\images";
            // 创建File对象，一会向该路径下上传文件
            File file = new File(realPath);
            if(!file.exists()){
                file.mkdirs();
            }
            //上传文件
            upload.transferTo(new File(file,filename));
            String responseSrc = "http://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/images"+"/"+filename;
            responseEntity = ResponseEntity.successWithData(responseSrc);
        } catch (Exception e) {
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        //返回给页面
        return responseEntity;
    }

}
