package cn.hele.emr.pac.service;


import cn.hele.emr.common.JsonResult;
import cn.hele.emr.pac.model.OperativeRecord;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author wyk
 * @since 2019-12-20
 */
public interface OperativeRecordService extends IService<OperativeRecord> {
    /**
     * <P>
     *  获取首诊页表单项
     * </P>
     * @reture JsonResult
     */
    JsonResult showOperativeRecord(Integer id);
}
