package cn.hele.emr.pac.dao;

import cn.hele.emr.pac.model.ReturnVisit;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author dxc
 * @since 2019-12-12
 */
@Repository
public interface ReturnVisitMapper extends BaseMapper<ReturnVisit>{
    /**
     * <p>
     * 获取随访页表单项
     * </p>
     * @param  id
     * @return ReturnVisit对象
     */
    ReturnVisit selectReturnVisit(Integer id);
    /**
     * <P>
     *  新建随访页表单项
     * </P>
     * @param returnVisit
     * @return Integer
     */
    Integer insertReturnVisit(ReturnVisit returnVisit);
    /**
     * <P>
     *  保存随访页表单项
     * </P>
     * @param returnVisit
     * @return Integer
     */
    Integer updateReturnVisit(ReturnVisit returnVisit);
    /**
     * <p>
     * 获取随访页表单列表
     * </p>
     * @param generalinfoid
     * @return ReturnVisit对象List
     */
    List<ReturnVisit> selectReturnVisitList(Integer generalinfoid);
}
