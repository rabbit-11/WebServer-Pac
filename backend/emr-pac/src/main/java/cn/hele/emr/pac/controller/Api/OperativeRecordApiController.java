package cn.hele.emr.pac.controller.Api;

import cn.hele.emr.common.JsonResult;
import cn.hele.emr.pac.service.OperativeRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author wyk
 * @since 2019-12-20
 */
@Controller
@RequestMapping("/operativeRecord")
public class OperativeRecordApiController {
    static final Integer success = 200;
    static final Integer fail = 204;
    @Autowired
    OperativeRecordService operativeRecordService;

    @ResponseBody
    @RequestMapping("/show")
    public JsonResult show(@RequestBody Map<String,Object> params) {
        Integer id = (Integer)params.get("id");
        JsonResult jsonResult = new JsonResult();
        if (id == null) {
            jsonResult.setCode(fail);
            jsonResult.setMessage("idcard不能为空");
            return jsonResult;
        }else {
            jsonResult = operativeRecordService.showOperativeRecord(id);
            return jsonResult;
        }
    }
}
