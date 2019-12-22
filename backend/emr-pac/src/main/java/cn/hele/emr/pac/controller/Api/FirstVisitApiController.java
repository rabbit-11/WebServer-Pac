package cn.hele.emr.pac.controller.Api;


import cn.hele.emr.common.JsonResult;
import cn.hele.emr.pac.model.FirstVisit;
import cn.hele.emr.pac.service.FirstVisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.Valid;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author xuzou,wyk,dxc
 * @since 2019-12-13
 */
@Controller
@RequestMapping("/api/pac/firstVisit")
public class FirstVisitApiController {

    static final Integer success = 200;
    static final Integer fail = 204;
    @Autowired
    FirstVisitService firstVisitService;

    @ResponseBody
    @RequestMapping("/show")
    public JsonResult show(@RequestBody Map<String,Object> params) {
        String idcard= (String)params.get("idcard");
        JsonResult jsonResult = new JsonResult();
        if (idcard == null) {
            jsonResult.setCode(fail);
            jsonResult.setMessage("idcard不能为空");
            return jsonResult;
        }else {
            jsonResult = firstVisitService.showFirstVisit(idcard);
            return jsonResult;
        }
    }

    @ResponseBody
    @RequestMapping("/add")
    public JsonResult add(@RequestBody @Valid FirstVisit firstVisit, BindingResult bindingResult){
        JsonResult jsonResult = new JsonResult();
        if(bindingResult.hasErrors()) {
            jsonResult.setCode(fail);
            jsonResult.setMessage(bindingResult.getFieldError().getDefaultMessage());
            return jsonResult;
        }
        jsonResult =firstVisitService.addFirstVisit(firstVisit);
        return jsonResult;
    }
}
