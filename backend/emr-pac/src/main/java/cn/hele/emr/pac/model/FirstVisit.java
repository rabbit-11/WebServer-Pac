package cn.hele.emr.pac.model;
import com.baomidou.mybatisplus.annotation.TableName;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 
 * </p>
 *
 * @author xuzou
 * @since 2019-12-10
 */
@TableName("pac_first_visit")
public class FirstVisit implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 自动编号
     */
    private Integer id;

    /**
     * 创建时间
     */
    private Date createtime;

    /**
     * 更新时间
     */
    private Date updatetime;

    /**
     * 就诊编号
     */
    private String jiuzhenid;

    /**
     * 创建科室编号
     */
    private String departmentcode;

    /**
     * 创建科室名称
     */
    private String departmentname;

    /**
     * 创建者工号
     */
    private String createusercode;

    /**
     * 创建者姓名
     */
    private String createusername;

    /**
     * 最后修改者工号
     */
    private String lastmofidyusercode;

    /**
     * 最后修改者姓名
     */
    private String lastmofidyusername;

    /**
     * 身份证号
     */
    private String idcard;

    /**
     * 健康号
     */
    private String patientid;

    /**
     * 姓名
     */
    private String personname;

    /**
     * 出生日期
     */
    private Date birthday;

    /**
     * 身高
     */
    private Double height;

    /**
     * 体重
     */
    private Double weight;

    /**
     * BMI
     */
    private Double bmi;

    /**
     * 末次月经时间
     */
    private Date lastmenstrualperiod;

    /**
     * 是否从事体力劳动
     */
    private String labor;

    /**
     * 文化程度
     */
    private String pacEducationcode;

    /**
     * 年收入
     */
    private String annualincome;

    /**
     * 婚姻状况
     */
    private String pacMaritalstatuscode;

    /**
     * 孕次
     */
    private String gravidity;

    /**
     * 产次
     */
    private String parity;

    /**
     * 人流次数
     */
    private Integer inducedabortion;

    /**
     * 上次流产时间
     */
    private Date preabortiontime;

    /**
     * 上次流产地点
     */
    private String preabortionplace;

    /**
     * 剖宫产次数
     */
    private Integer cesareansection;

    /**
     * 月经规律
     */
    private String menstrualcondition;

    /**
     * 高危因素
     */
    private String highriskreason;

    /**
     * 本次意外妊娠原因
     */
    private String gestationreason;

    /**
     * 避孕方式
     */
    private String contraceptivemethod;

    /**
     * 本次流产方式
     */
    private String abortionmethod;

    /**
     * 计划下次怀孕时间
     */
    private String plannextpreg;

    /**
     * 性别
     */
    private String sexcode;

    /**
     * 就诊卡号
     */
    private String patientaccount;

    /**
     * 联系方式
     */
    private String mobilenumber;

    /**
     * 户籍
     */
    private String pacRegisteredpermanent;

    /**
     * 档案状态，1为结案，0为有效
     */
    private String status;

    /**
     * 医护人员确认标志
     */
    private String isconfirm;

    /**
     * 健康宣教
     */
    private String guide;

    /**
     * 药流次数
     */
    private Integer qwetimes;

    /**
     * 上次分娩时间
     */
    private Date predeliverytime;

    /**
     * 上次分娩方式
     */
    private String pacPredeliverymode;

    /**
     * 上次分娩地点
     */
    private String predeliveryplace;

    /**
     * 月经情况
     */
    private String pacMenstrualvolume;

    /**
     * 痛经情况
     */
    private String pacDysmenorrhea;

    /**
     * 月经是否恢复
     */
    private String menstruationrestored;

    /**
     * 哺乳
     */
    private String lactation;

    /**
     * 上次流产的原因
     */
    private String preabortionreason;

    /**
     * 重复流产高危因素
     */
    private String repeatHighriskreason;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Date getUpdatetime() {
        return updatetime;
    }

    public void setUpdatetime(Date updatetime) {
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

    public String getIdcard() {
        return idcard;
    }

    public void setIdcard(String idcard) {
        this.idcard = idcard;
    }

    public String getPatientid() {
        return patientid;
    }

    public void setPatientid(String patientid) {
        this.patientid = patientid;
    }

    public String getPersonname() {
        return personname;
    }

    public void setPersonname(String personname) {
        this.personname = personname;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Double getBmi() {
        return bmi;
    }

    public void setBmi(Double bmi) {
        this.bmi = bmi;
    }

    public Date getLastmenstrualperiod() {
        return lastmenstrualperiod;
    }

    public void setLastmenstrualperiod(Date lastmenstrualperiod) {
        this.lastmenstrualperiod = lastmenstrualperiod;
    }

    public String getLabor() {
        return labor;
    }

    public void setLabor(String labor) {
        this.labor = labor;
    }

    public String getPacEducationcode() {
        return pacEducationcode;
    }

    public void setPacEducationcode(String pacEducationcode) {
        this.pacEducationcode = pacEducationcode;
    }

    public String getAnnualincome() {
        return annualincome;
    }

    public void setAnnualincome(String annualincome) {
        this.annualincome = annualincome;
    }

    public String getPacMaritalstatuscode() {
        return pacMaritalstatuscode;
    }

    public void setPacMaritalstatuscode(String pacMaritalstatuscode) {
        this.pacMaritalstatuscode = pacMaritalstatuscode;
    }

    public String getGravidity() {
        return gravidity;
    }

    public void setGravidity(String gravidity) {
        this.gravidity = gravidity;
    }

    public String getParity() {
        return parity;
    }

    public void setParity(String parity) {
        this.parity = parity;
    }

    public Integer getInducedabortion() {
        return inducedabortion;
    }

    public void setInducedabortion(Integer inducedabortion) {
        this.inducedabortion = inducedabortion;
    }

    public Date getPreabortiontime() {
        return preabortiontime;
    }

    public void setPreabortiontime(Date preabortiontime) {
        this.preabortiontime = preabortiontime;
    }

    public String getPreabortionplace() {
        return preabortionplace;
    }

    public void setPreabortionplace(String preabortionplace) {
        this.preabortionplace = preabortionplace;
    }

    public Integer getCesareansection() {
        return cesareansection;
    }

    public void setCesareansection(Integer cesareansection) {
        this.cesareansection = cesareansection;
    }

    public String getMenstrualcondition() {
        return menstrualcondition;
    }

    public void setMenstrualcondition(String menstrualcondition) {
        this.menstrualcondition = menstrualcondition;
    }

    public String getHighriskreason() {
        return highriskreason;
    }

    public void setHighriskreason(String highriskreason) {
        this.highriskreason = highriskreason;
    }

    public String getGestationreason() {
        return gestationreason;
    }

    public void setGestationreason(String gestationreason) {
        this.gestationreason = gestationreason;
    }

    public String getContraceptivemethod() {
        return contraceptivemethod;
    }

    public void setContraceptivemethod(String contraceptivemethod) {
        this.contraceptivemethod = contraceptivemethod;
    }

    public String getAbortionmethod() {
        return abortionmethod;
    }

    public void setAbortionmethod(String abortionmethod) {
        this.abortionmethod = abortionmethod;
    }

    public String getPlannextpreg() {
        return plannextpreg;
    }

    public void setPlannextpreg(String plannextpreg) {
        this.plannextpreg = plannextpreg;
    }

    public String getSexcode() {
        return sexcode;
    }

    public void setSexcode(String sexcode) {
        this.sexcode = sexcode;
    }

    public String getPatientaccount() {
        return patientaccount;
    }

    public void setPatientaccount(String patientaccount) {
        this.patientaccount = patientaccount;
    }

    public String getMobilenumber() {
        return mobilenumber;
    }

    public void setMobilenumber(String mobilenumber) {
        this.mobilenumber = mobilenumber;
    }

    public String getPacRegisteredpermanent() {
        return pacRegisteredpermanent;
    }

    public void setPacRegisteredpermanent(String pacRegisteredpermanent) {
        this.pacRegisteredpermanent = pacRegisteredpermanent;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getIsconfirm() {
        return isconfirm;
    }

    public void setIsconfirm(String isconfirm) {
        this.isconfirm = isconfirm;
    }

    public String getGuide() {
        return guide;
    }

    public void setGuide(String guide) {
        this.guide = guide;
    }

    public Integer getQwetimes() {
        return qwetimes;
    }

    public void setQwetimes(Integer qwetimes) {
        this.qwetimes = qwetimes;
    }

    public Date getPredeliverytime() {
        return predeliverytime;
    }

    public void setPredeliverytime(Date predeliverytime) {
        this.predeliverytime = predeliverytime;
    }

    public String getPacPredeliverymode() {
        return pacPredeliverymode;
    }

    public void setPacPredeliverymode(String pacPredeliverymode) {
        this.pacPredeliverymode = pacPredeliverymode;
    }

    public String getPredeliveryplace() {
        return predeliveryplace;
    }

    public void setPredeliveryplace(String predeliveryplace) {
        this.predeliveryplace = predeliveryplace;
    }

    public String getPacMenstrualvolume() {
        return pacMenstrualvolume;
    }

    public void setPacMenstrualvolume(String pacMenstrualvolume) {
        this.pacMenstrualvolume = pacMenstrualvolume;
    }

    public String getPacDysmenorrhea() {
        return pacDysmenorrhea;
    }

    public void setPacDysmenorrhea(String pacDysmenorrhea) {
        this.pacDysmenorrhea = pacDysmenorrhea;
    }

    public String getMenstruationrestored() {
        return menstruationrestored;
    }

    public void setMenstruationrestored(String menstruationrestored) {
        this.menstruationrestored = menstruationrestored;
    }

    public String getLactation() {
        return lactation;
    }

    public void setLactation(String lactation) {
        this.lactation = lactation;
    }

    public String getPreabortionreason() {
        return preabortionreason;
    }

    public void setPreabortionreason(String preabortionreason) {
        this.preabortionreason = preabortionreason;
    }

    public String getRepeatHighriskreason() {
        return repeatHighriskreason;
    }

    public void setRepeatHighriskreason(String repeatHighriskreason) {
        this.repeatHighriskreason = repeatHighriskreason;
    }

    @Override
    public String toString() {
        return "FirstVisit{" +
        ", id=" + id +
        ", createtime=" + createtime +
        ", updatetime=" + updatetime +
        ", jiuzhenid=" + jiuzhenid +
        ", departmentcode=" + departmentcode +
        ", departmentname=" + departmentname +
        ", createusercode=" + createusercode +
        ", createusername=" + createusername +
        ", lastmofidyusercode=" + lastmofidyusercode +
        ", lastmofidyusername=" + lastmofidyusername +
        ", idcard=" + idcard +
        ", patientid=" + patientid +
        ", personname=" + personname +
        ", birthday=" + birthday +
        ", height=" + height +
        ", weight=" + weight +
        ", bmi=" + bmi +
        ", lastmenstrualperiod=" + lastmenstrualperiod +
        ", labor=" + labor +
        ", pacEducationcode=" + pacEducationcode +
        ", annualincome=" + annualincome +
        ", pacMaritalstatuscode=" + pacMaritalstatuscode +
        ", gravidity=" + gravidity +
        ", parity=" + parity +
        ", inducedabortion=" + inducedabortion +
        ", preabortiontime=" + preabortiontime +
        ", preabortionplace=" + preabortionplace +
        ", cesareansection=" + cesareansection +
        ", menstrualcondition=" + menstrualcondition +
        ", highriskreason=" + highriskreason +
        ", gestationreason=" + gestationreason +
        ", contraceptivemethod=" + contraceptivemethod +
        ", abortionmethod=" + abortionmethod +
        ", plannextpreg=" + plannextpreg +
        ", sexcode=" + sexcode +
        ", patientaccount=" + patientaccount +
        ", mobilenumber=" + mobilenumber +
        ", pacRegisteredpermanent=" + pacRegisteredpermanent +
        ", status=" + status +
        ", isconfirm=" + isconfirm +
        ", guide=" + guide +
        ", qwetimes=" + qwetimes +
        ", predeliverytime=" + predeliverytime +
        ", pacPredeliverymode=" + pacPredeliverymode +
        ", predeliveryplace=" + predeliveryplace +
        ", pacMenstrualvolume=" + pacMenstrualvolume +
        ", pacDysmenorrhea=" + pacDysmenorrhea +
        ", menstruationrestored=" + menstruationrestored +
        ", lactation=" + lactation +
        ", preabortionreason=" + preabortionreason +
        ", repeatHighriskreason=" + repeatHighriskreason +
        "}";
    }
}
