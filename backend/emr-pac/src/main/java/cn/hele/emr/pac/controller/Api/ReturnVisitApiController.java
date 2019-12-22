package cn.hele.emr.pac.controller.Api;


import cn.hele.emr.common.JsonResult;
import cn.hele.emr.pac.model.ReturnVisit;
import cn.hele.emr.pac.service.ReturnVisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

/**
 * @author dxc
 */
@Controller
@RequestMapping("/api/pac/returnVisit")
public class ReturnVisitApiController {
    static final Integer success = 200;
    static final Integer fail = 204;

    @Autowired
    ReturnVisitService returnVisitService;

    @ResponseBody
    @RequestMapping("/show")
    public JsonResult show(@RequestBody Map<String,Object> params ){
        Integer id = (Integer)params.get("id");
        JsonResult jsonResult = new JsonResult();
        if (id == null) {
            jsonResult.setCode(fail);
            jsonResult.setMessage("id不能为空");
            return jsonResult;
        }else {
            jsonResult = returnVisitService.showReturnVisit(id);
            return jsonResult;
        }
    }

    @ResponseBody
    @RequestMapping("/add")
    public JsonResult add(@RequestBody @Valid ReturnVisit returnVisit, BindingResult bindingResult){
        JsonResult jsonResult = new JsonResult();
        if(bindingResult.hasErrors()) {
            jsonResult.setCode(fail);
            jsonResult.setMessage(bindingResult.getFieldError().getDefaultMessage());
            return jsonResult;
        }
        jsonResult =returnVisitService.addReturnVisit(returnVisit);
        return jsonResult;
    }

    @ResponseBody
    @RequestMapping("/update")
    public JsonResult update(@RequestBody @Valid ReturnVisit returnVisit, BindingResult bindingResult){
        JsonResult jsonResult = new JsonResult();
        if(bindingResult.hasErrors()) {
            jsonResult.setCode(fail);
            jsonResult.setMessage(bindingResult.getFieldError().getDefaultMessage());
            return jsonResult;
        }
        jsonResult =returnVisitService.updateReturnVisit(returnVisit);
        return jsonResult;
    }

    @ResponseBody
    @RequestMapping("/showList")
    public JsonResult showList(@RequestBody Map<String,Object> params ){
        Integer generalinfoid = (Integer)params.get("generalinfoid");
        JsonResult jsonResult = new JsonResult();
        if (generalinfoid == null) {
            jsonResult.setCode(fail);
            jsonResult.setMessage("generalinfoid不能为空");
            return jsonResult;
        }else {
            jsonResult = returnVisitService.showReturnVisitList(generalinfoid);
            return jsonResult;
        }
    }

}
