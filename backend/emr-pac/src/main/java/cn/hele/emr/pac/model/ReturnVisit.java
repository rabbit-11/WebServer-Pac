package cn.hele.emr.pac.model;

import com.baomidou.mybatisplus.annotation.TableName;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * <p>
 *
 * </p>
 *
 * @author dxc
 * @since 2019-12-12
 */
@TableName("pac_return_visit_2")
public class ReturnVisit  implements Serializable {
    private static final long serialVersionUID = 1L;
    /**
    /**
     * 自动编号
     */
    @NotNull(message = "id不能为空")
    private Integer id;

    /**
     * 创建时间
     */
    @Past(message = "创建时间格式错误且不能为未来，应该为2019-12-22T00:00:00")
    private LocalDateTime createtime;

    /**
     * 更新时间
     */
    @Past(message = "更新时间格式错误且不能为未来，应该为2019-12-22T00:00:00")
    private LocalDateTime updatetime;

    /**
     * 就诊编号
     */
    @Length(min = 1, max = 50, message = "就诊编号长度必须小于50")
    private String jiuzhenid;

    /**
     * 创建科室编号
     */
    @Length(min = 1, max = 50, message = "创建科室编号长度必须小于50")
    private String departmentcode;

    /**
     * 创建科室名称
     */
    @Length(min = 1, max = 150, message = "创建科室名称长度必须小于150")
    private String departmentname;

    /**
     * 创建者工号
     */
    @Length(min = 1, max = 50, message = "创建者工号长度必须小于50")
    private String createusercode;

    /**
     * 创建者姓名
     */
    @Length(min = 1, max = 50, message = "创建者姓名长度必须小于50")
    private String createusername;

    /**
     * 最后修改者工号
     */
    @Length(min = 1, max = 50, message = "最后修改者工号长度必须小于50")
    private String lastmofidyusercode;

    /**
     * 最后修改者姓名
     */
    @Length(min = 1, max = 50, message = "最后修改者姓名长度必须小于50")
    private String lastmofidyusername;
    /**
     * 避孕方式
     */
    @Length(min = 1, max = 2, message = "避孕方式长度必须小于2")
    private String visitContraceptivemethod;
    /**
     * 有无漏服避孕药
     */
    @Length(min = 1, max = 1, message = "避孕方式长度必须为一个字符")
    private String leakagemedicine;
    /**
     * 避孕药不良反应
     */
    @Length(min = 1, max = 500, message = "避孕药不良反应长度必须小于500")
    private String complication;
    /**
     * 白带情况
     */
    @Length(min = 1, max = 1, message = "白带情况必须为一个字符")
    private String leucorrhea;
    /**
     * 有无怀孕
     */
    @Length(min = 1, max = 1, message = "有无怀孕必须为一个字符")
    private String ispreged;
    /**
     * 吸烟
     */
    @Length(min = 1, max = 1, message = "吸烟必须为一个字符")
    private String smoking;
    /**
     * 运动频率
     */
    @Length(min = 1, max = 1, message = "运动频率必须为一个字符")
      private String sport;
    /**
     * 性生活频率
     */
    @Length(min = 1, max = 1, message = "性生活频率必须为一个字符")
    private String sexlifefreq;
    /**
     * 生化指标
     */
     private String bioindex;
    /**
     * 基本信息主键
     */
    @NotNull(message = "generalinfoid不能为空")
    private Integer generalinfoid;
    /**
     * 随访日期
     */
    @Past(message = "随访日期格式错误且不能为未来，应该为2019-12-22")
     private LocalDate visitdate;
    /**
     * 压力
     */
    @Length(min = 1, max = 1, message = "性生活频率必须为一个字符")
    private String pressure;
    /**
     * 焦虑
     */
    @Length(min = 1, max = 1, message = "焦虑必须为一个字符")
     private String anxious;
    /**
     * 抑郁
     */
    @Length(min = 1, max = 1, message = "抑郁必须为一个字符")
    private  String depressed;
    /**
     * 过度疲劳
     */
    @Length(min = 1, max = 1, message = "过度疲劳必须为一个字符")
    private String overfatigue;
    /**
     * 生气
     */
    @Length(min = 1, max = 1, message = "生气必须为一个字符")
    private  String angry;
    /**
     * 紧张
     */
    @Length(min = 1, max = 1, message = "紧张必须为一个字符")
    private  String tension;
    /**
     *避孕药名称
     */
    @Length(min = 1, max = 500, message = "避孕药名称长度必须小于500")
    private String acyeterionname;
    /**
     * 是否情绪变化
     */
    @Length(min = 1, max = 1, message = "是否情绪变化必须为一个字符")
    private String emotionalchange;
    /**
     * 是否体重变化
     */
    @Length(min = 1, max = 1, message = "是否体重变化必须为一个字符")
    private String weightchange;
    /**
     * 体重变化（kg）
     */
    @DecimalMax(value = "99999999.99", message = "体重变化不能大于99999999.99")
    @DecimalMin(value = "-999999.99", message = "体重变化不能小于-999999.99")
     private double weightchangeamount;
    /**
     * 避孕药不良反应
     */
    @Length(min = 1, max = 500, message = "避孕药不良反应长度必须小于500")
    private String medicineComplication;
    /**
     * 吸烟（支/天）
     */
     private Integer smokingamount;
    /**
     * 运动时长（分钟/次）
     */
    private Integer sportlength;
    /**
     * 运动方式
      */
    @Length(min = 1, max = 50, message = "运动方式长度必须小于50")
    private String sportmethod;
    /**
     * 术后复诊天数
     */
    private Integer afteroper;
    /**
     * 其他备注
     */
    @Length(min = 1, max = 2000, message = "其他备注长度必须小于2000")
     private String remark;
    /**
     * 月经量
     */
    @Length(min = 1, max = 1, message = "月经量必须为一个字符")
    private String menstrualvolume;
    /**
     * 痛经
     */
    @Length(min = 1, max = 1, message = "痛经必须为一个字符")
    private String visitDysmenorrhea;
    /**
     * 健康宣教
     */
    private String guide;
    /**
     * 身体状况
     */
    @Length(min = 1, max = 1, message = "身体状况必须为一个字符")
    private String physicalcondition;
    /**
     * 阴道流血
     */
    @Length(min = 1, max = 1, message = "阴道流血必须为一个字符")
    private String vaginalbleeding;
    /**
     * 记录时间
     */
    @Past(message = "记录时间格式错误且不能为未来，应该为2019-12-22T00:00:00")
    private LocalDateTime recordtime;
    /**
     * 避孕药盒数
     */
    @Length(min = 1, max = 50, message = "避孕药盒数长度必须小于50")
    private String acyeterioncount;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDateTime getCreatetime() {
        return createtime;
    }

    public void setCreatetime(LocalDateTime createtime) {
        this.createtime = createtime;
    }

    public LocalDateTime getUpdatetime() {
        return updatetime;
    }

    public void setUpdatetime(LocalDateTime updatetime) {
        this.updatetime = updatetime;
    }

    public String getJiuzhenid() {
        return jiuzhenid;
    }

    public void setJiuzhenid(String jiuzhenid) {
        this.jiuzhenid = jiuzhenid;
    }

    public String getDepartmentcode() {
        return departmentcode;
    }

    public void setDepartmentcode(String departmentcode) {
        this.departmentcode = departmentcode;
    }

    public String getDepartmentname() {
        return departmentname;
    }

    public void setDepartmentname(String departmentname) {
        this.departmentname = departmentname;
    }

    public String getCreateusercode() {
        return createusercode;
    }

    public void setCreateusercode(String createusercode) {
        this.createusercode = createusercode;
    }

    public String getCreateusername() {
        return createusername;
    }

    public void setCreateusername(String createusername) {
        this.createusername = createusername;
    }

    public String getLastmofidyusercode() {
        return lastmofidyusercode;
    }

    public void setLastmofidyusercode(String lastmofidyusercode) {
        this.lastmofidyusercode = lastmofidyusercode;
    }

    public String getLastmofidyusername() {
        return lastmofidyusername;
    }

    public void setLastmofidyusername(String lastmofidyusername) {
        this.lastmofidyusername = lastmofidyusername;
    }

    public String getVisitContraceptivemethod() {
        return visitContraceptivemethod;
    }

    public void setVisitContraceptivemethod(String visitContraceptivemethod) {
        this.visitContraceptivemethod = visitContraceptivemethod;
    }

    public String getLeakagemedicine() {
        return leakagemedicine;
    }

    public void setLeakagemedicine(String leakagemedicine) {
        this.leakagemedicine = leakagemedicine;
    }

    public String getComplication() {
        return complication;
    }

    public void setComplication(String complication) {
        this.complication = complication;
    }

    public String getLeucorrhea() {
        return leucorrhea;
    }

    public void setLeucorrhea(String leucorrhea) {
        this.leucorrhea = leucorrhea;
    }

    public String getIspreged() {
        return ispreged;
    }

    public void setIspreged(String ispreged) {
        this.ispreged = ispreged;
    }

    public String getSmoking() {
        return smoking;
    }

    public void setSmoking(String smoking) {
        this.smoking = smoking;
    }

    public String getSport() {
        return sport;
    }

    public void setSport(String sport) {
        this.sport = sport;
    }

    public String getSexlifefreq() {
        return sexlifefreq;
    }

    public void setSexlifefreq(String sexlifefreq) {
        this.sexlifefreq = sexlifefreq;
    }

    public String getBioindex() {
        return bioindex;
    }

    public void setBioindex(String bioindex) {
        this.bioindex = bioindex;
    }

    public Integer getGeneralinfoid() {
        return generalinfoid;
    }

    public void setGeneralinfoid(Integer generalinfoid) {
        this.generalinfoid = generalinfoid;
    }

    public LocalDate getVisitdate() {
        return visitdate;
    }

    public void setVisitdate(LocalDate visitdate) {
        this.visitdate = visitdate;
    }

    public String getPressure() {
        return pressure;
    }

    public void setPressure(String pressure) {
        this.pressure = pressure;
    }

    public String getAnxious() {
        return anxious;
    }

    public void setAnxious(String anxious) {
        this.anxious = anxious;
    }

    public String getDepressed() {
        return depressed;
    }

    public void setDepressed(String depressed) {
        this.depressed = depressed;
    }

    public String getOverfatigue() {
        return overfatigue;
    }

    public void setOverfatigue(String overfatigue) {
        this.overfatigue = overfatigue;
    }

    public String getAngry() {
        return angry;
    }

    public void setAngry(String angry) {
        this.angry = angry;
    }

    public String getTension() {
        return tension;
    }

    public void setTension(String tension) {
        this.tension = tension;
    }

    public String getAcyeterionname() {
        return acyeterionname;
    }

    public void setAcyeterionname(String acyeterionname) {
        this.acyeterionname = acyeterionname;
    }

    public String getEmotionalchange() {
        return emotionalchange;
    }

    public void setEmotionalchange(String emotionalchange) {
        this.emotionalchange = emotionalchange;
    }

    public String getWeightchange() {
        return weightchange;
    }

    public void setWeightchange(String weightchange) {
        this.weightchange = weightchange;
    }

    public double getWeightchangeamount() {
        return weightchangeamount;
    }

    public void setWeightchangeamount(double weightchangeamount) {
        this.weightchangeamount = weightchangeamount;
    }

    public String getMedicineComplication() {
        return medicineComplication;
    }

    public void setMedicineComplication(String medicineComplication) {
        this.medicineComplication = medicineComplication;
    }

    public Integer getSmokingamount() {
        return smokingamount;
    }

    public void setSmokingamount(Integer smokingamount) {
        this.smokingamount = smokingamount;
    }

    public Integer getSportlength() {
        return sportlength;
    }

    public void setSportlength(Integer sportlength) {
        this.sportlength = sportlength;
    }

    public String getSportmethod() {
        return sportmethod;
    }

    public void setSportmethod(String sportmethod) {
        this.sportmethod = sportmethod;
    }

    public Integer getAfteroper() {
        return afteroper;
    }

    public void setAfteroper(Integer afteroper) {
        this.afteroper = afteroper;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getMenstrualvolume() {
        return menstrualvolume;
    }

    public void setMenstrualvolume(String menstrualvolume) {
        this.menstrualvolume = menstrualvolume;
    }

    public String getVisitDysmenorrhea() {
        return visitDysmenorrhea;
    }

    public void setVisitDysmenorrhea(String visitDysmenorrhea) {
        this.visitDysmenorrhea = visitDysmenorrhea;
    }

    public String getGuide() {
        return guide;
    }

    public void setGuide(String guide) {
        this.guide = guide;
    }

    public String getPhysicalcondition() {
        return physicalcondition;
    }

    public void setPhysicalcondition(String physicalcondition) {
        this.physicalcondition = physicalcondition;
    }

    public String getVaginalbleeding() {
        return vaginalbleeding;
    }

    public void setVaginalbleeding(String vaginalbleeding) {
        this.vaginalbleeding = vaginalbleeding;
    }

    public LocalDateTime getRecordtime() {
        return recordtime;
    }

    public void setRecordtime(LocalDateTime recordtime) {
        this.recordtime = recordtime;
    }

    public String getAcyeterioncount() {
        return acyeterioncount;
    }

    public void setAcyeterioncount(String acyeterioncount) {
        this.acyeterioncount = acyeterioncount;
    }

    @Override
    public String toString() {
        return "ReturnVisit{" +
                ",id=" + id +
                ",createtime=" + createtime +
                ",updatetime=" + updatetime +
                ",jiuzhenid=" + jiuzhenid +
                ",departmentcode=" + departmentcode +
                ",departmentname=" + departmentname +
                ",createusercode=" + createusercode +
                ",createusername=" + createusername +
                ",lastmofidyusercode=" + lastmofidyusercode +
                ",lastmofidyusername=" + lastmofidyusername +
                ",visitContraceptivemethod=" + visitContraceptivemethod +
                ",leakagemedicine=" + leakagemedicine +
                ",complication" + complication +
                ",leucorrhea=" + leucorrhea +
                ",ispreged=" + ispreged +
                ",smoking=" + smoking +
                ",sport=" + sport +
                ",sexlifefreq=" + sexlifefreq +
                ",bioindex=" + bioindex +
                ",generalinfoid=" + generalinfoid +
                ",visitdate=" + visitdate +
                ",pressure=" + pressure +
                ",anxious=" + anxious +
                ",depressed=" + depressed +
                ",overfatigue=" + overfatigue +
                ",angry=" + angry +
                ",tension=" + tension +
                ",acyeterionname=" + acyeterionname +
                ",emotionalchange=" + emotionalchange +
                ",weightchange=" + weightchange +
                ",weightchangeamount=" + weightchangeamount +
                ",medicineComplication=" + medicineComplication +
                ",smokingamount=" + smokingamount +
                ",sportlength=" + sportlength +
                ",sportmethod=" + sportmethod +
                ",afteroper=" + afteroper +
                ",remark=" + remark +
                ",menstrualvolume=" + menstrualvolume +
                ",visitDysmenorrhea=" + visitDysmenorrhea +
                ",guide=" + guide +
                ",physicalcondition=" + physicalcondition +
                ",vaginalbleeding=" + vaginalbleeding +
                ",recordtime=" + recordtime +
                ",acyeterioncount=" + acyeterioncount+
                "}";
    }
}
