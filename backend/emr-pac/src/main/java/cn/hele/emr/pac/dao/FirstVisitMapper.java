package cn.hele.emr.pac.dao;

import cn.hele.emr.pac.model.FirstVisit;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.springframework.stereotype.Repository;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author xuzou,wyk
 * @since 2019-12-13
 */
@Repository
public interface FirstVisitMapper extends BaseMapper<FirstVisit> {
    /**
     * <p>
     *     查询数据库首诊页项
     * </p>
     * @return FirstVisit对象
     */
    FirstVisit queryFirstVisit(String idcard);
    /**
     * <p>
     *     保存时插入数据库首诊页项
     * </p>
     * @return Integer
     */
    Integer insertFirstVisit(FirstVisit firstVisit);
    /**
     * <p>
     *     保存时更新数据库首诊页项
     * </p>
     * @return Integer
     */
    Integer updateFirstVisit(FirstVisit firstVisit);
}
