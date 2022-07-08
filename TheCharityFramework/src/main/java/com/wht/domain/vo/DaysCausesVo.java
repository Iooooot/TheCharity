package com.wht.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/***
 * 后台展示每日慈善捐助数据的vo对象
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DaysCausesVo {
    //日期
    private LocalDate period;
    //当日筹集资金数
    private Double raised;


}
