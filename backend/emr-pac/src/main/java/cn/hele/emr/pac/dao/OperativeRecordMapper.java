package cn.hele.emr.pac.dao;

import cn.hele.emr.pac.model.OperativeRecord;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.springframework.stereotype.Repository;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author wyk
 * @since 2019-12-20
 */
@Repository
public interface OperativeRecordMapper extends BaseMapper<OperativeRecord> {
    /**
     * <p>
     *     查询数据库手术记录页项
     * </p>
     * @return operativeRecord对象
     */

    OperativeRecord queryOperativeRecord(Integer id);
}
