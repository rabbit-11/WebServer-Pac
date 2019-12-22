package cn.hele.emr.pac.service;

import cn.hele.emr.common.JsonResult;
import cn.hele.emr.pac.model.FirstVisit;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xuzou,wyk
 * @since 2019-12-13
 */
public interface FirstVisitService extends IService<FirstVisit> {
    /**
     * <P>
     *  获取首诊页表单项
     * </P>
     * @reture firstVisit对象
     */
    JsonResult showFirstVisit(String idcard);
    /**
     * <P>
     *  保存首诊页表单项
     * </P>
     * @reture 返回状态bool
     */
    JsonResult addFirstVisit(FirstVisit firstVisit);
}
