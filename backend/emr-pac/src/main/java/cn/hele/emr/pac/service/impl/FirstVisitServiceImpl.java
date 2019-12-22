package cn.hele.emr.pac.service.impl;

import cn.hele.emr.common.JsonResult;
import cn.hele.emr.pac.model.FirstVisit;
import cn.hele.emr.pac.dao.FirstVisitMapper;
import cn.hele.emr.pac.service.FirstVisitService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xuzou,wyk
 * @since 2019-12-13
 */
@Service
public class FirstVisitServiceImpl extends ServiceImpl<FirstVisitMapper, FirstVisit> implements FirstVisitService {

    @Autowired
    FirstVisitMapper firstVisitMapper;
    static final Integer success = 200;
    static final Integer fail = 204;

    @Override
    public JsonResult showFirstVisit(String idcard) {
        try{
            JsonResult jsonResult = new JsonResult();
            FirstVisit firstVisit = firstVisitMapper.queryFirstVisit(idcard);
            if(firstVisit != null){
                jsonResult.put("info",firstVisit);
                jsonResult.setMessage("获取成功");
                jsonResult.setCode(success);
            } else {
                jsonResult.put("info",null);
                jsonResult.setMessage("查询结果为空");
                jsonResult.setCode(success);
            }
            return jsonResult;
        } catch (Exception e){
            return null;
        }
    }

    @Override
    public JsonResult addFirstVisit(FirstVisit firstVisit) {
        try{
            JsonResult jsonResult = new JsonResult();
            // 判断是更新还是插入,先查数据库是否存在这个首诊记录。
            FirstVisit firstVisitIsExist = firstVisitMapper.queryFirstVisit(firstVisit.getIdcard());
            System.out.println(firstVisitIsExist);
            //不存在为null就做插入, 存在就做更新操作。
            Integer resultNumber;
            if(firstVisitIsExist == null){
                resultNumber = firstVisitMapper.insertFirstVisit(firstVisit);
            } else {
                System.out.println("此为更新");
                resultNumber = firstVisitMapper.updateFirstVisit(firstVisit);
                System.out.println(resultNumber);
            }
            //根据操作结果返回jsonResult
            if(resultNumber == 0){
                jsonResult.put("info",false);
                jsonResult.setMessage("保存失败");
                jsonResult.setCode(fail);
            } else{
                jsonResult.put("info",true);
                jsonResult.setMessage("保存成功");
                jsonResult.setCode(success);
            }

            return jsonResult;
        } catch (Exception e){
            return null;
        }
    }

}
