package com.wht.filter;

import com.wht.domain.entity.User;
import com.wht.utils.TheCharityConst;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/***
 * 拦截用户是否登录的过滤器
 */
public class AdminLoginFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        //先判断是否session中有admin对象
        HttpSession session = request.getSession();
        User user = (User)session.getAttribute(TheCharityConst.ATTR_NAME_LOGIN_ADMIN);
        if(user == null){
            //管理员未登录
            //直接重定向到登录页面
            response.sendRedirect("login.html");
        }else{
            //管理员已经登录放行
            filterChain.doFilter(request, response);
        }
    }
}
