package cn.hele.emr.pac.service.impl;


import cn.hele.emr.common.JsonResult;
import cn.hele.emr.pac.dao.OperativeRecordMapper;
import cn.hele.emr.pac.model.OperativeRecord;
import cn.hele.emr.pac.service.OperativeRecordService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author wyk
 * @since 2019-12-20
 */
@Service
public class OperativeRecordServiceImpl extends ServiceImpl<OperativeRecordMapper, OperativeRecord> implements OperativeRecordService{

    @Autowired
    OperativeRecordMapper operativeRecordMapper;
    static final Integer success = 200;
    static final Integer fail = 204;

    @Override
    public JsonResult showOperativeRecord(Integer id) {
        try{
            JsonResult jsonResult = new JsonResult();
            OperativeRecord operativeRecord = operativeRecordMapper.queryOperativeRecord(id);
            if(operativeRecord != null){
                jsonResult.put("info",operativeRecord);
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
}
