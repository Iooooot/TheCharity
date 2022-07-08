package com.wht.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wht.domain.entity.Causes;
import org.springframework.stereotype.Repository;


/**
 * 慈善项目表(Causes)表数据库访问层
 *
 * @author makejava
 * @since 2022-04-18 20:41:12
 */
@Repository
public interface CausesMapper extends BaseMapper<Causes> {

    Integer selectRaisedMoney();

    Integer selectFinishedCauseNum();

    Double getTodayCausesRaised(String dateTime);
}

