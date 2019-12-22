package cn.hele.emr.pac;

import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.PackageConfig;
import com.baomidou.mybatisplus.generator.config.StrategyConfig;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;
import com.baomidou.mybatisplus.generator.engine.BeetlTemplateEngine;
/**
 * MyBatis-plus 代码生成器
 */
public class CodeGenerator {
    // 数据库连接配置
    private static final String DB_URL = "jdbc:sqlserver://heletech.asuscomm.com:8082;DatabaseName=HL_PAC";
    private static final String DB_USERNAME = "huzfypt";
    private static final String DB_PASSWORD = "huz3305@2018.";
    // 数据库表前缀
    private static final String[] TB_PREFIX = new String[]{"pac_"};
    // 输出位置
    private static final String OUTPUT_DIR = "d:\\workspaces\\codeGen";
    private static final String PACKAGE_NAME = "cn.hele.emr.pac";
    private static final String[] TABLE_NAMES = {"pac_first_visit"};


    public static void main(String[] args) {
        generateByTables(false, PACKAGE_NAME, TABLE_NAMES);
    }

    public static void generateByTables(boolean serviceNameStartWithI, String packageName, String... tableNames) {
        AutoGenerator mpg = new AutoGenerator();  // 代码生成器
        // 全局配置
        GlobalConfig gc = new GlobalConfig();
        gc.setOutputDir(OUTPUT_DIR);  // 输出位置
        gc.setFileOverride(true);  // 覆盖文件
        gc.setAuthor("xuzou");
        gc.setOpen(true);
        gc.setActiveRecord(false);  // ActiveRecord 模式
        gc.setEnableCache(false);  // 二级缓存
        if (!serviceNameStartWithI) {
            gc.setServiceName("%sService");  // service命名方式
        }
        mpg.setGlobalConfig(gc);

        // 数据源配置
        DataSourceConfig dsc = new DataSourceConfig();
        dsc.setUrl(DB_URL);
        dsc.setDriverName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        dsc.setUsername(DB_USERNAME);
        dsc.setPassword(DB_PASSWORD);
        mpg.setDataSource(dsc);

        // 包配置
        PackageConfig pc = new PackageConfig();
        pc.setParent(packageName);
        pc.setMapper("dao");
        pc.setXml("xml");
        pc.setController("controller");
        pc.setEntity("model");
        mpg.setPackageInfo(pc);

        // 策略配置
        StrategyConfig strategy = new StrategyConfig();
        strategy.setCapitalMode(true);  // 大写命名
        strategy.setEntityLombokModel(false); // lombok模型
        strategy.setColumnNaming(NamingStrategy.underline_to_camel); // 表名映射策略
        strategy.setNaming(NamingStrategy.underline_to_camel);  // 字段映射策略
        strategy.setTablePrefix(TB_PREFIX);  // 表前缀
        strategy.setInclude(tableNames);
        mpg.setStrategy(strategy);

        // 模板引擎
        mpg.setTemplateEngine(new BeetlTemplateEngine());

        mpg.execute();
    }
}