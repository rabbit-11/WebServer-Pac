package cn.hele.emr.pac.service;

import cn.hele.emr.common.JsonResult;
import cn.hele.emr.pac.model.ReturnVisit;
import com.baomidou.mybatisplus.extension.service.IService;


/**
 * <p>
 *  服务类
 * </p>
 *
 * @author dxc
 * @since 2019-12-13
 */
public interface ReturnVisitService extends IService<ReturnVisit> {
    /**
     * <P>
     *  获取随访页表单项
     * </P>
     * @param id
     * @return JsonResult
     */
    JsonResult showReturnVisit(Integer id);

    /**
     * <P>
     *  新建随访页表单项
     * </P>
     * @param returnVisit
     * @return
     */
    JsonResult addReturnVisit(ReturnVisit returnVisit);

    /**
     * <P>
     *  保存随访页表单项
     * </P>
     * @param returnVisit
     * @return
     */
    JsonResult updateReturnVisit(ReturnVisit returnVisit);

    /**
     * <P>
     *  获取随访页表单列表
     * </P>
     * @param generalinfoid
     * @return JsonResult
     */
    JsonResult showReturnVisitList(Integer generalinfoid);
}
