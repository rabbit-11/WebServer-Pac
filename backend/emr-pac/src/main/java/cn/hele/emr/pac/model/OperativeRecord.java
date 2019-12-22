package cn.hele.emr.pac.model;

import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 *
 * </p>
 *
 * @author wyk
 * @since 2019-12-20
 */
@TableName("pac_operative_record")
public class OperativeRecord implements Serializable {
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
     * 手术记录
     */
    private String surgicalrecords;
    /**
     * 流产后立即落实的避孕方式
     */
    private String firstContraceptivemethod;
    /**
     * 避孕药盒数
     */
    private String acyeterioncount;
    /**
     * 是否告知注意事项
     */
    private String informattention;
    /**
     * 是否指导正确使用
     */
    private String informguide;
    /**
     * 基本信息主键
     */
    private Integer generalinfoid;
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
     * 记录日期
     */
    private Date visitdate;
    /**
     * 避孕药名称
     */
    private String acyeterionname;
    /**
     * 手术日期
     */
    private Date surgicaldate;
    /**
     * 健康宣教
     */
    private String guide;
    /**
     * 手术方式
     */
    private String surgicalmethod;
    /**
     * 血清留存
     */
    private String serumretention;
    /**
     * 组织物留存
     */
    private String tissueretention;
    /**
     * 立即落实
     */
    private String immediateimply;

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

    public String getSurgicalrecords() {
        return surgicalrecords;
    }

    public void setSurgicalrecords(String surgicalrecords) {
        this.surgicalrecords = surgicalrecords;
    }

    public String getFirstContraceptivemethod() {
        return firstContraceptivemethod;
    }

    public void setFirstContraceptivemethod(String firstContraceptivemethod) {
        this.firstContraceptivemethod = firstContraceptivemethod;
    }

    public String getAcyeterioncount() {
        return acyeterioncount;
    }

    public void setAcyeterioncount(String acyeterioncount) {
        this.acyeterioncount = acyeterioncount;
    }

    public String getInformattention() {
        return informattention;
    }

    public void setInformattention(String informattention) {
        this.informattention = informattention;
    }

    public String getInformguide() {
        return informguide;
    }

    public void setInformguide(String informguide) {
        this.informguide = informguide;
    }

    public Integer getGeneralinfoid() {
        return generalinfoid;
    }

    public void setGeneralinfoid(Integer generalinfoid) {
        this.generalinfoid = generalinfoid;
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

    public Date getVisitdate() {
        return visitdate;
    }

    public void setVisitdate(Date visitdate) {
        this.visitdate = visitdate;
    }

    public String getAcyeterionname() {
        return acyeterionname;
    }

    public void setAcyeterionname(String acyeterionname) {
        this.acyeterionname = acyeterionname;
    }

    public Date getSurgicaldate() {
        return surgicaldate;
    }

    public void setSurgicaldate(Date surgicaldate) {
        this.surgicaldate = surgicaldate;
    }

    public String getGuide() {
        return guide;
    }

    public void setGuide(String guide) {
        this.guide = guide;
    }

    public String getSurgicalmethod() {
        return surgicalmethod;
    }

    public void setSurgicalmethod(String surgicalmethod) {
        this.surgicalmethod = surgicalmethod;
    }

    public String getSerumretention() {
        return serumretention;
    }

    public void setSerumretention(String serumretention) {
        this.serumretention = serumretention;
    }

    public String getTissueretention() {
        return tissueretention;
    }

    public void setTissueretention(String tissueretention) {
        this.tissueretention = tissueretention;
    }

    public String getImmediateimply() {
        return immediateimply;
    }

    public void setImmediateimply(String immediateimply) {
        this.immediateimply = immediateimply;
    }

    @Override
    public String toString() {
        return "OperativeRecord{" +
        ", id=" + id +
        ", createtime=" + createtime +
        ", updatetime=" + updatetime +
        ", surgicalrecords=" + surgicalrecords +
        ", firstContraceptivemethod=" + firstContraceptivemethod +
        ", acyeterioncount=" + acyeterioncount +
        ", informattention=" + informattention +
        ", informguide=" + informguide +
        ", generalinfoid=" + generalinfoid +
        ", jiuzhenid=" + jiuzhenid +
        ", departmentcode=" + departmentcode +
        ", departmentname=" + departmentname +
        ", createusercode=" + createusercode +
        ", createusername=" + createusername +
        ", lastmofidyusercode=" + lastmofidyusercode +
        ", lastmofidyusername=" + lastmofidyusername +
        ", visitdate=" + visitdate +
        ", acyeterionname=" + acyeterionname +
        ", surgicaldate=" + surgicaldate +
        ", guide=" + guide +
        ", serumretention=" + serumretention +
        ", tissueretention=" + tissueretention +
        ", immediateimply=" + immediateimply +
        "}";
    }
}
