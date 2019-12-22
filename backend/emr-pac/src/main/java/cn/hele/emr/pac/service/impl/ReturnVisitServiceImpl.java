package cn.hele.emr.pac.service.impl;

import cn.hele.emr.common.JsonResult;
import cn.hele.emr.pac.dao.ReturnVisitMapper;
import cn.hele.emr.pac.model.ReturnVisit;
import cn.hele.emr.pac.service.ReturnVisitService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author dxc
 * @since 2019-12-13
 */
@Service
public class ReturnVisitServiceImpl extends ServiceImpl<ReturnVisitMapper, ReturnVisit> implements ReturnVisitService {

    @Autowired
    private  ReturnVisitMapper returnVisitMapper;
    static final Integer success = 200;
    static final Integer fail = 204;

    @Override
    public JsonResult showReturnVisit(Integer id) {
        try{
            JsonResult jsonResult = new JsonResult();
            ReturnVisit returnVisit = returnVisitMapper.selectReturnVisit(id);
            if(returnVisit == null){
                jsonResult.put("info",null);
                jsonResult.setMessage("查询结果为空");
                jsonResult.setCode(fail);
            }else{
                jsonResult.put("info",returnVisit);
                jsonResult.setMessage("获取成功");
                jsonResult.setCode(success);
            }
            return jsonResult;
        } catch (Exception e){
            return null;
        }
    }

    @Override
    public JsonResult addReturnVisit(ReturnVisit returnVisit) {
        try{
            JsonResult jsonResult = new JsonResult();
            Integer num = returnVisitMapper.insertReturnVisit(returnVisit);
            if(num == 0){
                jsonResult.put("info","false");
                jsonResult.setMessage("保存失败");
                jsonResult.setCode(fail);
            }else{
                jsonResult.put("info","true");
                jsonResult.setMessage("保存成功");
                jsonResult.setCode(success);
            }
            return jsonResult;
        } catch (Exception e){
            System.out.println(e);
            return null;
        }
    }

    @Override
    public JsonResult updateReturnVisit(ReturnVisit returnVisit) {
        try{
            JsonResult jsonResult = new JsonResult();
            Integer num = returnVisitMapper.updateReturnVisit(returnVisit);
            if(num == 0){
                jsonResult.put("info","false");
                jsonResult.setMessage("保存失败");
                jsonResult.setCode(fail);
            }else{
                jsonResult.put("info","true");
                jsonResult.setMessage("保存成功");
                jsonResult.setCode(success);
            }
            return jsonResult;
        } catch (Exception e){
            System.out.println(e);
            return null;
        }
    }

    @Override
    public JsonResult showReturnVisitList(Integer generalinfoid) {
        JsonResult jsonResult = new JsonResult();
        try{
            List<ReturnVisit> returnVisit = returnVisitMapper.selectReturnVisitList(generalinfoid);
            if(returnVisit.size() == 0){
                jsonResult.put("info",null);
                jsonResult.setMessage("查询结果为空");
                jsonResult.setCode(fail);
            }else{
                jsonResult.put("info",returnVisit);
                jsonResult.setMessage("获取成功");
                jsonResult.setCode(success);
            }
            return jsonResult;
        } catch (Exception e){
            return null;
        }
    }
}
