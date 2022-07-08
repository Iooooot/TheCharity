package com.wht.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class pageVo<T> {
    protected List<T> records;
    protected long total;
    protected long size;
    protected long current;
    protected long pages;
}
