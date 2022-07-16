-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: project_thecharity
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `causes`
--

DROP TABLE IF EXISTS `causes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `causes` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '项目id',
  `title` varchar(256) DEFAULT NULL COMMENT '项目标题',
  `summary` longtext COMMENT '项目摘要',
  `author` varchar(64) DEFAULT NULL COMMENT '项目发布者',
  `task` longtext COMMENT '项目任务目标',
  `background` longtext COMMENT '项目背景',
  `raised` int DEFAULT '0' COMMENT '已筹集资金',
  `goal` int DEFAULT NULL COMMENT '目标资金',
  `type` char(1) DEFAULT '1' COMMENT '项目分类(1普通公益2特色公益3热门活动)',
  `bigPic` varchar(128) DEFAULT NULL COMMENT '项目展示大图路径',
  `smallPic` varchar(128) DEFAULT NULL COMMENT '项目展示小图路径',
  `create_time` datetime DEFAULT NULL COMMENT '项目发布时间',
  `del_flag` int DEFAULT '0' COMMENT '删除标志(0表示未删除1表示已删除)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COMMENT='慈善项目表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `causes`
--

LOCK TABLES `causes` WRITE;
/*!40000 ALTER TABLE `causes` DISABLE KEYS */;
INSERT INTO `causes` (`id`, `title`, `summary`, `author`, `task`, `background`, `raised`, `goal`, `type`, `bigPic`, `smallPic`, `create_time`, `del_flag`) VALUES (1,'涓涓善心牵小手,大爱无疆润幼苗','公益基金管委会到贫困县开展“互联网+教育”助学扶贫公益助学活动。并准备筹集70000元向贫困县捐赠平板电脑、教学软件卡等教育信息化设备。旨在帮助贫困县农村孩子、留守儿童和农民工子女改善学习条件、激发学习兴趣。','CHILDREN\'S CHARITY','帮助贫困县农村孩子、留守儿童和农民工子女改善学习条件、激发学习兴趣。受助学校要真正管好、用好这些设备，使其发挥最大作用，服务我们的教育教学工作；教师队伍要加倍努力，不断提高自身的教育水平和管理水平，努力打造让社会满意、人民满意、学生满意的好学校，不辜负社会各界对我们的支持和厚爱；','据介绍，为落实农工党中央对贫困省脱贫攻坚民主监督工作的有关要求，落实中央有关教育信息化的战略部署和第二次全国教育信息化工作会议精神，积极参与农工党中央全国精准扶贫计划，公益基金管理委员会联合贫困省工业和信息化厅，在贫困省联合开展“互联网+教育” 助力教育信息化公益活动，支持贫困100个教育相对滞后的县（区、市）基础教育事业发展，捐助信息化物资，推进信息技术与教育教学深度融合。贫困县是其中之一。',105,75000,'3','http://127.0.0.1:8081/TheCharity/images/1.jpg','http://127.0.0.1:8081/TheCharity/images/u-1.jpg','2022-04-06 08:42:09',0),(2,'给生命一次机会,给孩子一个未来','共享蓝天•共促成长”爱心书桌椅捐赠公益活动走进印度贫困儿童学校，向印度贫困儿童学校的贫困家庭少年儿童捐赠爱心书桌椅200套。','AI YOU FOUNDATION','我们针对一些家庭比较贫困的孩子们，他们对书桌椅的需要，安排给他们使用，希望这些书桌椅能够对他们的学习状况有所改善，能让他们养成良好的书写习惯。有助于他们学业的进步和健康的成长。基金总工会准备资助9万元购置爱心书桌椅5000余套，并准备全部赠送到各市、县贫困地区和革命老区的困境儿童手中。\r\n','基金总工会将继续为学校和孩子们做实事，关心和帮助有需要的少年儿童解决书桌椅问题，为他们创造和争取更多、更优质的学习、教育资源，不断改善学习、教育条件和环境，鼓励孩子们加倍努力，认真读书，长大后报效祖国，回报社会，建设家乡。',0,90000,'1','http://127.0.0.1:8081/TheCharity/images/2.jpg','http://127.0.0.1:8081/TheCharity/images/u-2.jpg','2022-04-17 15:27:52',0),(3,'开启“最美成长路”儿童营养公益计划 助力小学生健康成长','“最美成长路”儿童营养公益计划正式启动。儿童营养公益计划启动，覆盖5所乡村小学，自此1700多名小学生在学校喝上了营养奶。','CHILDREN\'S CHARITY','在乡村孩子的教育条件得到不断提升的同时，学生的营养健康发展也至关重要。XX县人民政府表示，“最美成长路”计划对XX县教育事业来说意义重大，它不仅为学生带来物质上的帮助、精神上的鼓励，更是为贫困地区的学生提供了较好的营养保障。','据介绍，根据中国营养学会公布的《中国学龄儿童膳食指南》，“a2营养站”为孩子们提供每日300毫升的饮奶量，并为孩子们配备饮奶杯和保温桶。目前，首批奶粉已经全部到达并投入使用。XX县中心学校校长农兴亮表示，下一步将做好牛奶发放管理及体质监测工作，使爱心奶粉真正成为学生健康成长的催化剂。',0,60000,'2','http://127.0.0.1:8081/TheCharity/images/3.jpg','http://127.0.0.1:8081/TheCharity/images/u-3.jpg','2022-04-20 15:30:07',0),(4,'百年人寿陕西分公司志愿者开展关爱自闭症儿童公益活动','自闭症儿童又被称作“来自星星的孩子”。因为他们像天上的星星一样在远方闪烁着光芒，沉浸在自己的世界里，不愿与别人交流。他们不论和谁都有着星星一般遥远的距离。','Children\'s Foundation of China','只有为自闭症儿童提供更加良好的社会氛围，充分地给予他们更多的耐心、支持、尊重和陪伴，才能帮助他们健康成长。关爱自闭症儿童还需要我们和社会上的人更多的努力。','《美国自闭症2020年报告》显示，根据2016年的数据，每54名美国儿童中就会有一人患有自闭症。中国自闭症群体多达1100万人，其中自闭症儿童有200多万。自闭症儿童又被称作“来自星星的孩子”。因为他们像天上的星星一样在远方闪烁着光芒，沉浸在自己的世界里，不愿与别人交流。他们不论和谁都有着星星一般遥远的距离。百年人寿xx公司的志愿者们来到位于xx市的“拉拉手特殊教育中心”看望这里患有“自闭症”的孩子，活动当天，是一位自闭症小朋友“奔奔”的生日，百年陕分的志愿者们为“奔奔”带来了精美的蛋糕，在“拉拉手特教中心”老师们的带领下，共同为“奔奔”小朋友庆祝生日，活动现场，老师、志愿者、其他小朋友分别演唱歌曲，为“奔奔”小朋友送上了最美好的生日祝福，活动现场一片欢声笑语，孩子们在老师、志愿者们的陪伴下度过了一个美好的下午。',0,45000,'1','http://127.0.0.1:8081/TheCharity/images/4.jpg','http://127.0.0.1:8081/TheCharity/images/event-1.jpg','2022-04-19 15:33:43',0),(5,'矮小症关爱活动走入贫困村庄科普矮小症知识','儿童生长发育系列公益活动在贫困村庄展开。本次活动由中国红十字基金会和XX大学附属第二医院共同主办。活动邀请该院儿科和儿保科专家现场授课，并开展了儿童生长发育义诊，为身高偏矮的儿童进行骨龄测评，帮孩子们制定个性化的科学成长方案。','AI YOU FOUNDATION','本次活动携手中国红十字基金会成长天使基金，共同关注青少年儿童生长发育问题，早期发现相关疾病，同时将提供专项公益基金，为符合条件的贫困矮小儿童提供帮助，希望通过此次公益活动帮助更多患儿改善生活质量，减轻家庭负担，促进全社会对儿童生长发育的关注。','随着人民群众生活水平的提高和生活方式的转变，肥胖、性早熟、生长发育迟缓等多种儿童生长发育问题激增，目前，我国矮小儿童约700万，7岁以上儿童超重肥胖人数约3900万，已成为危害儿童健康的公共卫生问题。',0,66000,'1','http://127.0.0.1:8081/TheCharity/images/hero.jpg','http://127.0.0.1:8081/TheCharity/images/event-2.jpg','2022-04-14 15:34:22',0),(6,'天使医院开启春季康复爱心援助活动 帮助孤贫患儿们健康成长','为全面帮扶特殊儿童发展及成长，减轻特殊儿童家庭经济困难，天使儿童医院特此春季针对儿童疑难病进行公益援助活动','CHILDREN\'S CHARITY','天使公益行为2-14岁的困境儿童群体开展公益举措，设有对贫困儿童家庭的“公益帮扶治疗”、测评检查、健康义诊等多种措施，通过对困境儿童的早期干预康复的医疗帮扶，关爱青少年儿童身心健康成长，让更多贫困地区患儿享受到优质、便利的诊疗服务。','近年来，天使儿童医院切实维护和保障儿童的基本权益，加大对特殊困难儿童的救助保障力度，保障儿童福利工作水平不断提升。阳光少年基金以帮扶青少年健康成长为主题，帮助一部分青少年贫困的家庭援助成长补助金，成立项目“童康100梦想公益行动”，帮助更多贫困儿童，使贫困残疾儿童得到康复救助。\r\n',0,120000,'3','http://127.0.0.1:8081/TheCharity/images/cause-bg.jpg','http://127.0.0.1:8081/TheCharity/images/event-3.jpg','2022-04-15 15:38:40',0),(7,'轻松筹启动自闭症儿童关爱计划 守护来自星星的孩子们','近日,轻松筹联合公益基金会(WABC)启动了“错袜日特殊儿童关爱计划”,为儿童们送去温暖和关怀,呼吁大家以穿错袜的方式,表达对“自闭症”、“脑瘫”等特殊人群的支持。','Children\'s Foundation of China','为了增加社会包容度,唤起公众同理心,2016年,上海艺途公益基金会(WABC)发起了“穿两只不一样袜子”的公益行为,并将每年的12月23日定为“错袜日”。如今,“错袜日”迎来了第六个纪念日,今年12月23日这一天,轻松筹联合上海艺途公益基金会(WABC),再次将目光投向这个世界上一群来自星星的孩子们。','与此同时,轻松筹还邀请人气主播小小疯携手开启公益直播间,将进行义卖袜子的直播活动,义卖所筹善款将全部用于特殊儿童的公益帮扶。呼吁更多人关注这一类特殊儿童,为他们的童年给予更多的爱和理解。\r\n据不完全统计,错袜日自发起至今,已有超过10个国家的志愿者共同支持了错袜公益行动,错袜相关话题在线上共计获得近2亿阅读量,超6万互动量,错袜理念影响力可达上千万人次。',0,88000,'2','http://127.0.0.1:8081/TheCharity/images/5.jpg','http://127.0.0.1:8081/TheCharity/images/u-4.jpg','2022-04-18 01:16:21',0),(8,'2022”笑容行动”计划开启 救助惠州自闭症患儿','中国儿童自闭症公益万里行救助活动旨在引导全社会参与关爱自闭症儿童、推动中西医融合在儿童自闭症领域的慈善救助工程。该活动由社会慈善基金参与救助，以“科学干预、合理治疗”为核心原则，救助3-6岁自闭症儿童。','CHILDREN\'S CHARITY','“笑容行动”计划2022惠州第一站活动，为惠州地区4名自闭症患儿筹款40万元进行公益救助。这4名“星孩”将接受为期8天的现代中医压力波经络调理救治，以达到改善核心症状的目的。此外今年惠州慈航公益协会将计划筹集200万元，为粤港澳大湾区20名自闭症患儿进行公益救助，给自闭症患儿及其家庭带来新的希望。','2021年，中国儿童自闭症公益万里行在吉林、宁波、北京、丽江、惠州连续开展了5次面向不同地域、不同民族、不同年龄段（3到9岁）的30名自闭症儿童的公益性救助活动。\r\n\r\n3月5日下午，中国儿童自闭症公益万里行下基层送温暖，联合惠州市慈航公益协会启动粤港澳大湾区启动儿童自闭症“笑容行动”计划。“笑容行动”旨在综合集成健康医学现代中医经络诊调的最新研究成果，持续为粤港澳大湾区适龄自闭症儿童带来生活自理，行为可控，融入社会的公益行动。',0,92000,'1','http://127.0.0.1:8081/TheCharity/images/7.jpg','http://127.0.0.1:8081/TheCharity/images/u-5.jpg','2022-04-10 01:19:40',0),(9,'满天星公益-流动书箱','为了解决乡村师生们对阅读推广的需要，满天星公益发起“流动书箱”项目','AI YOU FOUNDATION','为了解决乡村师生们对阅读推广的需要，满天星公益发起“流动书箱”项目：以条件合适的中心学校作为分支书库，共同形成的一个流动图书资源网络，通过有愿意开展推动阅读的乡村老师自主申请，让优质阅读资源流动到更匮乏的乡村老师和孩子身边。相较于 10 万元的一个公益图书馆高投入，1200 元的一个流动书箱平衡了成本与需求，作为县域阅读推广的一环共同满足乡村阅读资源的需求。','流动书箱是满天星公益图书馆项目除小学馆和社区馆外，第三种图书馆模式。\r\n\r\n缺少资源的学校通常缺少老师，难以支持图书馆的开放运营，所以捐赠图书馆对于此类学校不是最佳的选择。流动书箱项目以“共读分享、循环阅读”为理念，精选了国内外的精美绘本和童书放置在书箱中，可以很大程度上提高图书的使用率，让阅读资源匮乏地区的儿童也能享受优质的童书资源；也让有意愿开展阅读课程和活动老师可以有更合适的阅读资源。\r\n\r\n',0,100000,'1','http://127.0.0.1:8081/TheCharity/images/8.jpg','http://127.0.0.1:8081/TheCharity/images/u-6.jpg','2022-04-12 01:22:08',0),(10,'血液病患儿救助项目-爱佑天使申请方式（白血病患儿救助）','爱佑儿童医疗项目矩阵倾力于孤贫儿童的医疗救助，开展的癌症相关项目有“爱佑天使”——孤贫血液病、肿瘤患儿医疗救助项目','Children\'s Foundation of China','爱佑儿童医疗项目矩阵倾力于孤贫儿童的医疗救助，开展的癌症相关项目有“爱佑天使”——孤贫血液病、肿瘤患儿医疗救助项目（白血病之外的病种需要咨询定点医院及基金会是否救助，项目申请需要通过合作医院向上申请）。','爱佑慈善基金会是民政部评定的5A级基金会，由企业家发起并管理运作，在全国范围内开展项目。经过十余年的探索与发展，爱佑形成了儿童医疗、儿童福利和公益创投三大项目矩阵。',0,150000,'3','http://127.0.0.1:8081/TheCharity/images/9.jpg','http://127.0.0.1:8081/TheCharity/images/u-7.jpg','2022-04-13 01:23:52',0),(11,'困境儿童生活改善行动','中国儿基会美好家园公益项目发起的“困境儿童生活改善行动”公益行动，旨在针对合作城市的孤儿、事实孤儿、留守儿童等困境儿童群体，因父母离世、经济贫困、缺衣少食、营养不良的生存状况，提供生活、学习、大病、意外全方位的呵呵，向孩子传递人间关爱温暖，重现灿烂笑颜，幸福健康快乐成长。','AI YOU FOUNDATION','中国儿基会美好家园公益项目发起的“困境儿童生活改善行动”公益行动，旨在针对合作城市的孤儿、事实孤儿、留守儿童等困境儿童群体，因父母离世、经济贫困、缺衣少食、营养不良的生存状况，提供生活、学习、大病、意外全方位的呵呵，向孩子传递人间关爱温暖，重现灿烂笑颜，幸福健康快乐成长。','1、我们将为每位孤儿建立资金托管账户，每年提供生活学习补助，让孩子享有公平教育的权利，让知识改变孤儿命运，成就孤儿未来；\r\n\r\n2、我们每年为孤儿提供大病、医疗和意外伤害的救助保障，帮助他们抵御重大疾病和意外伤害的侵袭，帮助孤儿健康成长；\r\n\r\n3、我们的志愿者通过定期走访孤儿，建立孤儿数据库，了解孤儿的学习生活情况，传递社会关爱和人间温暖，帮助孤儿健康幸福快乐成长。',0,70000,'1','http://127.0.0.1:8081/TheCharity/images/10.jpg','http://127.0.0.1:8081/TheCharity/images/u-8.jpg','2022-04-07 01:25:40',0),(12,'爱佑童心帮助先心病患儿鼓起勇气战胜病魔，开启全新生活','“给生命一次机会，给孩子一个未来”，这是爱佑慈善基金会的理念和使命，也是爱佑不断前进的动力源泉。','CHILDREN\'S CHARITY','项目采用定点医院合作模式，在全国各地区选择医疗条件较好的医院为合作定点单位，为先心病患儿提供治疗；主动联合定点医院、捐赠方、政府部门及其它社会组织搭建救助网络，实现优势资源的互补及共享，发挥救助平台高效作用，为患儿创造就医条件，使更多患儿享受优质的医疗检查及手术治疗。','先天性心脏病是常见的新生儿先天性疾病，只要得到及时治疗，大部分简单先心病可以治疗彻底，大多数复杂先心病也可治疗，加以术后的康复辅助，基本也能保障生活质量。',0,180000,'1','http://127.0.0.1:8081/TheCharity/images/11.jpg','http://127.0.0.1:8081/TheCharity/images/u-9.jpg','2022-04-08 01:27:36',0),(13,'少儿普惠教育支持计划','美好家园将为合作城市提供智慧教育云平台的公益捐建，帮助当地教育行政管理部门建设本土化的教育资源公共服务平台+教育管理公共服务平台。','Children\'s Foundation of China','为了让合作城市的孩子们共享首都的优质教育资源，加强素质培养，实现教育均衡，推动普惠教育，美好家园将为合作城市提供智慧教育云平台的公益捐建，帮助当地教育行政管理部门建设本土化的教育资源公共服务平台+教育管理公共服务平台。','为了让合作城市的孩子们共享首都的优质教育资源，加强素质培养，实现教育均衡，推动普惠教育，美好家园将为合作城市提供智慧教育云平台的公益捐建，帮助当地教育行政管理部门建设本土化的教育资源公共服务平台+教育管理公共服务平台。同时刻根据政府需求，引入并无偿捐赠北京中央直属机关实验幼儿园等数十所名优园所同步采用的课程体系和素质教育课件（科学、音乐、围棋）。为了保证公益活动效果，项目办将对示范幼儿园提供免费的师资培训。',0,96000,'1','http://127.0.0.1:8081/TheCharity/images/13.jpg','http://127.0.0.1:8081/TheCharity/images/u-10.jpg','2022-04-09 01:30:05',0),(14,'“点爱·微心愿”公益项目正式启动','“点爱微心愿”，是山东省妇女儿童发展基金会与齐鲁晚报齐鲁壹点联合创立的公益项目。在山东省妇联的领导和支持下，16市妇联和齐鲁晚报·齐鲁壹点16市融媒中心联合联动，鼓励引导各类企业、社会组织开展慈善活动和社会捐赠，带动社会各界共同关注、共同关爱困境儿童、农村留守儿童和孤独症儿童。','齐鲁壹点百家号','以“汇聚点点爱心，铸就未来希望”为宗旨的“点爱·微心愿”公益项目在济南启动，关爱困境儿童和农村留守儿童的成长，支持和参与孤独症儿童的康复救助。\n鼓励引导各类企业、社会组织开展慈善活动和社会捐赠，带动社会各界共同关注、共同关爱困境儿童、农村留守儿童和孤独症儿童。','点爱微心愿”公益项目要在实现物质生活富裕的同时满足精神生活的富裕。在物质生活关爱方面，为受助儿童准备生活用品心愿包、学习用品心愿包或体育用品心愿包等；在精神生活关爱方面，联动社会组织、齐鲁晚报·齐鲁壹点志愿者团队等积极开展关爱服务，培养儿童自强不息、乐观向上的生活态度。\n\n同时注重展示儿童在党的温暖下自强不息、成长成才的精神风貌，教育儿童不断树立国家意识，深化爱国主义情怀，激发爱党爱国奋斗之志，争做社会主义建设者和可靠接班人。\n\n2021年6月，山东省妇女儿童发展基金会与齐鲁晚报·齐鲁壹点达成战略合作，以可持续发展为准则，共同发展公益事业。联合创建“点爱行动”公益品牌，设立“点爱·微心愿”公益项目，旨在汇聚点点爱心，铸就未来希望。\n\n山东省妇女儿童发展基金会自1981年成立以来，一直以积极宣传、动员社会力量筹集资金,发展妇女儿童事业。在山东省妇联的领导下，第六届理事会积极开展妇女儿童公益慈善工作，在自身建设和筹款规模等方面取得突破性进展。',0,80000,'1','http://localhost:8081/TheCharity/images/F81A7B4EE62A4FB1AA5073280B8417EE_pro01.jpg','http://localhost:8081/TheCharity/images/074063F452A142F6B7438257C3D31136_p01.jpg','2022-04-24 16:39:55',0);
/*!40000 ALTER TABLE `causes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `news_id` bigint NOT NULL COMMENT '评论的资讯id',
  `root_id` bigint DEFAULT '-1' COMMENT '根评论id',
  `content` varchar(512) DEFAULT NULL COMMENT '评论内容',
  `to_comment_user_id` bigint DEFAULT '-1' COMMENT '所回复评论的userid',
  `to_comment_id` bigint DEFAULT '-1' COMMENT '所回复的评论id',
  `create_time` datetime DEFAULT NULL COMMENT '评论时间',
  `create_by` bigint DEFAULT NULL COMMENT '评论发起的用户id',
  `del_flag` int DEFAULT '0' COMMENT '删除标志(0表示未删除1表示删除)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='资讯评论表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` (`id`, `news_id`, `root_id`, `content`, `to_comment_user_id`, `to_comment_id`, `create_time`, `create_by`, `del_flag`) VALUES (1,1,-1,'希望他们能够越来越好！！！！',-1,-1,'2022-04-20 08:34:52',1,0),(2,1,-1,'不愧是爱佑慈善基金会！！！真的是中国慈善的榜样呀！！！',-1,-1,'2022-04-20 11:35:31',1,0),(3,1,1,'嗯嗯我十分赞同这个同学说的话！！说的很好！',1,1,'2022-04-20 16:42:04',7,0),(5,1,-1,'这个慈善活动真的让我叹为观止呀！！！！！',-1,-1,'2022-04-20 21:58:17',1,0),(6,1,-1,'13213213',-1,-1,'2022-04-20 22:05:14',1,0),(7,1,1,'李倩是个哈狗!!!!',7,3,'2022-04-20 22:20:15',1,1),(8,16,-1,'wow~',-1,-1,'2022-04-25 11:07:24',1,0),(9,1,1,'嗯嗯好的',7,3,'2022-04-25 11:22:47',1,0),(10,2,-1,'希望他们真的会越来越好',-1,-1,'2022-04-25 11:27:13',1,0),(11,4,-1,'希望他们过得好些！',-1,-1,'2022-06-02 17:21:16',1,1),(12,1,-1,'12321',-1,-1,'2022-07-08 21:44:15',1,0),(13,1,-1,'我好的很',-1,-1,'2022-07-08 21:44:25',1,0),(14,1,13,'对的',1,13,'2022-07-08 21:44:29',1,0);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donations`
--

DROP TABLE IF EXISTS `donations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donations` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '捐助订单id',
  `trade_no` varchar(64) NOT NULL COMMENT '交易订单号',
  `amount` decimal(10,2) NOT NULL COMMENT '捐助金额',
  `user_id` bigint NOT NULL COMMENT '捐助者id',
  `message` varchar(1024) DEFAULT '用户没留言，不过他们留下了爱心' COMMENT '捐助者留言',
  `cause_id` bigint NOT NULL COMMENT '捐助项目id',
  `create_time` datetime DEFAULT NULL COMMENT '捐助时间',
  `status` char(1) DEFAULT '0' COMMENT '0为未支付1为已支付',
  `del_flag` int DEFAULT '0' COMMENT '删除标志(0表示未删除1表示已删除)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='捐助情况表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donations`
--

LOCK TABLES `donations` WRITE;
/*!40000 ALTER TABLE `donations` DISABLE KEYS */;
INSERT INTO `donations` (`id`, `trade_no`, `amount`, `user_id`, `message`, `cause_id`, `create_time`, `status`, `del_flag`) VALUES (3,'1517475698716053504',5.00,1,'',1,'2022-04-22 20:09:35','1',0),(5,'1517482746371510272',100.00,1,'希望能够帮助到他们',1,'2022-04-22 20:37:35','1',0),(6,'1533325161443495936',10.00,1,'都好',1,'2022-06-05 13:49:41','0',0),(7,'1533325954821263360',5.00,1,'好',1,'2022-06-05 13:52:50','0',0),(8,'1533326114724909056',5.00,1,'好',1,'2022-06-05 13:53:28','0',0),(9,'1533326454153154560',50.00,1,'',1,'2022-06-05 13:54:49','0',0),(10,'1533328012576165888',5.00,1,'',1,'2022-06-05 14:01:01','0',0),(11,'1533328431083819008',1000.00,1,'',1,'2022-06-05 14:02:40','0',0),(12,'1533328876846059520',1000.00,1,'',1,'2022-06-05 14:04:27','0',0),(13,'1533329530972934144',1000.00,1,'',1,'2022-06-05 14:07:03','0',0),(14,'1533330225469984768',1000.00,1,'',1,'2022-06-05 14:09:48','0',0),(15,'1533333263752499200',1000.00,1,'',1,'2022-06-05 14:21:53','0',0),(16,'1533336704486871040',1000.00,1,'',2,'2022-06-05 14:35:33','0',0),(17,'1540617718351400960',100.00,1,'',1,'2022-06-25 16:47:42','0',0),(18,'1545403019435315200',1000.00,1,'',5,'2022-07-08 21:42:47','0',0);
/*!40000 ALTER TABLE `donations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '资讯id',
  `title` varchar(256) DEFAULT NULL COMMENT '资讯标题',
  `content` longtext COMMENT '资讯内容',
  `summary` varchar(1024) DEFAULT NULL COMMENT '资讯摘要',
  `type` char(1) DEFAULT '1' COMMENT '资讯分类(1普通新闻2热点聚焦3公益头条4今日要闻)',
  `author` varchar(32) DEFAULT NULL COMMENT '发布作者',
  `create_time` datetime DEFAULT NULL COMMENT '发布时间',
  `comments_number` int DEFAULT '0' COMMENT '评论数',
  `bigPic` varchar(128) DEFAULT NULL COMMENT '资讯展示大图路径',
  `del_flag` int DEFAULT '0' COMMENT '删除标志(0表示未删除1表示删除)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COMMENT='新闻资讯表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` (`id`, `title`, `content`, `summary`, `type`, `author`, `create_time`, `comments_number`, `bigPic`, `del_flag`) VALUES (1,'爱佑慈善基金会深耕儿童公益领域，旨是为给予更多患儿生的希望！','爱佑慈善基金会-“爱佑天使”血液病及实体肿瘤患儿医疗救助项目，助力血液病、实体肿瘤患儿家庭渡过艰难治疗阶段。\n\n第一次见到心然，是在2017年的冬天，她正处在化疗期，尽管身体有些虚弱，但她坚定的眼神，给我们留下了深刻的印象。\n\n2016年底到2017年初，心然总是发低烧，状态也越来越不好，妈妈就带着她来到北京儿童医院，按照医生的建议，心然做了血项检查和骨穿，最终被确诊为急性淋巴细胞白血病，这让心然妈妈非常自责，是不是因为自己没照顾好，才让原本健康的女儿，突然得了这么严重的病。\n\n心然爸爸来自河北农村，在北京郊区打工，忙于工作的他，35岁才跟妻子有了心然。尽管生活算不上富裕，但一家三口的生活一直幸福美满，尤其心然生得格外可爱、活泼，即使工作再辛苦，两口子一看到女儿就充满了干劲。但突如其来的白血病，完全打乱了这个小家的生活。\n\n起初的忙乱、不安之后，心然父母慢慢了解到，只要坚持治疗和注意防护，女儿的病治愈率还是很高的，最大的难处，是高昂的治疗费用。\n\n医生告诉心然爸妈，至少要准备30万左右，这在白血病患儿的治疗中，其实还不算太高。根据国家儿童医学中心、中华医学会等开展的调查，根据不同分型和危险程度，儿童白血病治疗费用在十余万元至80万元不等，中位数在50万元左右。\n\n2017年夏天，心然开始接受化疗。在拿出家里几乎所有的积蓄，以及跟亲朋好友借遍之后，心然爸爸又在护士和病友的帮助下，申请了爱佑慈善基金会-爱佑天使项目的救助。\n\n在这么多爱的支持下，心然坚强地完成了11个月的化疗，尽管头发和眉毛都掉光了，但她一直没有丢失过脸上的笑容。心然的爸爸妈妈也在这个过程中，通过跟医生和病友们的不断交流，更加充分地认识了白血病。\n\n2018年10月，我们去心然家里看望已经结疗回家的她。平稳度过化疗期的她，头发和眉毛正在重新生长，不变的仍然是她总是挂着笑容的脸庞。\n\n当时的心然仍处于维持期，为了避免感冒，她很少出门。在北京郊区租住的家里，摆放着很多心然喜欢的洋娃娃和毛绒玩具，她也高兴地一个一个向我们介绍，“这是我的宠物猫猫凯蒂”、“这个洋娃娃是我的好朋友”......\n\n心然妈妈依旧没有去工作，在家里悉心照顾着女儿。心然确诊一年多来的种种经历，也让妈妈十分感慨，“家长的情绪和状态，对孩子的影响特别大。所以我尽量积极乐观，希望能给她多一点的力量和支持。”\n\n2019年，我们又一次见到了心然，已经完全看不出也感受不到她有任何治疗过的感觉，等不及头发长长的她，还特意让妈妈帮她买了一副假发。\n\n当时的她，已经上了幼儿园，最喜欢的就是美术课。\n\n2020年6月，北京广播电视台著名主持人春妮在爱佑慈善基金会的淘宝直播间，专程为结疗出院已经961天的心然下厨，庆祝心然康复的同时，还跟心然一起把福气传递给还在医院治疗的血液病患儿，祝愿他们早日康复，回到美食的怀抱。\n\n今年是我们和心然相识的第五个年头，爱佑慈善基金会用一组写真作为新年礼物，送给结疗后一直愿意和我们分享成长的这对母女，不仅记录下心然充满活力的快乐童年，也希望心然的康复，能鼓舞更多的白血病患儿和家长，让他们获得更多的力量和希望。','爱佑慈善基金会-“爱佑天使”血液病及实体肿瘤患儿医疗救助项目于2011年5月成立，旨在帮助血液、实体肿瘤患儿及其家庭度过艰难的治疗阶段，给予更多患儿生的希望。2022年，爱佑慈善基金会希望更多像心然一样的宝贝都能收获更多的爱与关怀，勇敢战胜白血病，重新回到平凡又快乐的生活。','4','AI YOU FOUNDATION','2022-04-20 02:58:17',6,'http://127.0.0.1:8081/TheCharity/images/oshomah.jpg',0),(2,'“点爱·微心愿”公益项目正式启动','“点爱微心愿”，是山东省妇女儿童发展基金会与齐鲁晚报齐鲁壹点联合创立的公益项目。在山东省妇联的领导和支持下，16市妇联和齐鲁晚报·齐鲁壹点16市融媒中心联合联动，鼓励引导各类企业、社会组织开展慈善活动和社会捐赠，带动社会各界共同关注、共同关爱困境儿童、农村留守儿童和孤独症儿童。\r\n\r\n在项目推进过程中，妇联将发挥多年的工作优势，链接受助群体，齐鲁晚报·齐鲁壹点发挥媒体优势，挖掘能够引起大众共情的故事，共同号召和动员爱心企业爱心企业和人士，为受助儿童提供资金及实物的帮扶。\r\n\r\n“点爱微心愿”公益项目要在实现物质生活富裕的同时满足精神生活的富裕。在物质生活关爱方面，为受助儿童准备生活用品心愿包、学习用品心愿包或体育用品心愿包等；在精神生活关爱方面，联动社会组织、齐鲁晚报·齐鲁壹点志愿者团队等积极开展关爱服务，培养儿童自强不息、乐观向上的生活态度。\r\n\r\n同时注重展示儿童在党的温暖下自强不息、成长成才的精神风貌，教育儿童不断树立国家意识，深化爱国主义情怀，激发爱党爱国奋斗之志，争做社会主义建设者和可靠接班人。','以“汇聚点点爱心，铸就未来希望”为宗旨的“点爱·微心愿”公益项目在济南启动，关爱困境儿童和农村留守儿童的成长，支持和参与孤独症儿童的康复救助。','1','齐鲁壹点百家号','2022-04-20 03:38:29',1,'http://127.0.0.1:8081/TheCharity/images/news01.jpg',0),(3,'HELLO小孩公益项目走进同江市第三小学，送出爱心套餐700套','活动现场，受助孩子为与会领导佩戴红领巾。魏巧伶对受助学生寄予殷切希望，希望受助学生做一个“自尊、自信、自立、自强”的少年，变艰苦为动力，树立远大理想，刻苦学习，争取早日成为国家栋梁，以实际行动报答社会。\r\n\r\n“HELLO 小孩”是中国儿童少年基金会发起的公益项目，向困境儿童和遭受突发灾害地区儿童发放日常学生套餐和灾后应急套餐，精心设计的爱心包分别配置了高品质的生活学习用品和应急物品。小小套餐既是雪中送炭，也是春风化雨，更因为捐赠门槛低、捐赠方式灵活，圆了更多人的公益梦。\r\n\r\n据了解，HELLO小孩公益项目活动旨在让孩子们在安全健康、平等包容的环境中，感受爱和力量，享受童真童趣，向阳成长。这些可爱的“萌芽”在孩子们心里，埋下了小小的种子，陪伴他们成长，然后待梦想开出繁花。“HELLO 小孩”的每个故事都闪着光。','中国儿童基金会HELLO小孩公益项目爱心套餐发放仪式在同江市第三小学举行，当日，同江市妇女联合会共为孩子们送来了价值14万元“HELLO小孩”爱心套餐700套，为需要帮助的儿童送去社会各界的问候和关爱。','2','全国儿童公益慈善组织','2022-04-20 03:27:34',0,'http://127.0.0.1:8081/TheCharity/images/news02.jpg',0),(4,'轻松筹联合发起孤儿守护公益计划 用爱点亮他们的成长之路','除此之外，在轻松筹·轻松公益平台上，由北京微爱公益基金会发起的“帮助那些在病房里渴望知识的孩子们”、由中华少年儿童慈善救助基金会发起的“百村千童助学计划”、由中华社会救助基金会发起的“血液病儿童紧急救助”等公募项目正在进行中。来自社会各界的组织机构、社会力量、爱心人士聚集于此，共同关注孤困儿童的健康成长。\r\n\r\n值得一提的是，轻松筹与中国SOS儿童村合作并非第一次。早在2016年，轻松筹便开始与找你过SOS儿童村建立起深度合作关系。2016年6月，轻松筹作为“万家灯火”项目志愿服务合作单位，在自身平台上发起“万家灯火·SOS儿童村一对一助养”“万家灯火·SOS儿童村不限额随手捐”两个项目，为儿童村筹集进57万元善款。随后，轻松筹还发起二次筹款用于支付儿童村妈妈们的工资，让这些为爱发电的儿童村妈妈们获得基本的生活保障。诸如此类的合作一直延续至今，轻松筹一直和像中国SOS儿童村一样的合作伙伴，共同以实际行动为孤困儿童送上温暖。\r\n\r\n在长期主义价值引导下，轻松筹以多种形式的公益行动，帮助困难群体度过难关，不仅获得了受助者的高度评价，也赢得了社会各界的广泛好评！此次推出“陪你长大孤儿守护公益计划”就是要以平台影响力带动更多人加入关爱孤儿行动中来，让他们也能像正常孩子一样享受社会大家庭的温暖。','目前，在散布全国的儿童村中，有上千名孤儿正在得到儿童村妈妈嗯的悉心照料，感受爱的温暖。在今年世界儿童日到来之际，轻松筹携手中国SOS儿童村，呼吁更多人帮助孤儿群体，用爱点亮他们的成长之路。\r\n','3','中国SOS儿童村协会','2022-04-20 03:40:37',0,'http://127.0.0.1:8081/TheCharity/images/news03.jpg',0),(5,'中国儿童自闭症公益万里行活动走进广东惠州 救助4名自闭症儿童','此次救助活动由中国宋庆龄基金会、全国妇幼健康研究会给予支持，洽圩（北京）综合医学研究院推动实施，爱心机构——惠州市卓岳堂中医诊所参与招募活动志愿者，利用健康医学创新突破技术救助4名自闭症儿童。\r\n\r\n公益救助过程中，每名患儿经过为期8天，合计8次、48万个Meta-Synthesis 集束压力波个性化经络诊调后，再通过六个月的自然修复，将明显改善其自闭症核心症状。\r\n\r\n此次活动实施单位应用的儿童自闭症健康医学诊调技术，于2021年12月5号经过国际欧亚科学院中国科学中心组织的技术创新论证，是儿童自闭症康复技术的新突破。该技术从人体系统结构、功能、环境方面系统分析入手，制定个性化的经络干预方案，从诊调经络障碍着眼，利用现代科学物理技术使失衡的经络系统重新发挥调节人体气血再平衡的能力，激发人体系统的自我修复功能，使人体进入平衡、稳定的健康态，进而从根本上改善自闭症儿童生理与心理所表现出来的核心症状，是一种全新的经络诊调体系和行之有效的医学实践创新。\r\n\r\n利用这一创新技术，公益万里行实施单位去年曾在吉林、宁波、北京、丽江四地完成26例自闭症儿童公益救助，实践证明：孩子们经过半年的有效自然修复后，儿童自闭症核心症状全部明显改善。已经有两名儿童走进了普通九年制义务教育学校接受义务教育，近半数儿童均已过渡到普通幼儿园接受幼儿教育。\r\n','公益万里行执委会及爱心机构将继续创新实践，在儿童自闭症康复领域和社会层面与各方深度合作，积极推广这一创新技术广泛应用，努力为更多自闭症儿童早日改善核心症状作出贡献','1','万里行执委会','2022-04-20 05:41:45',0,'http://127.0.0.1:8081/TheCharity/images/news04.jpg',0),(6,'美赞成发起留守儿童营养守护活动 为留守儿童提供营养支持','12月31日，在众星云集的浙江卫视跨年晚会上，美赞臣中国业务集团携品牌大使李晨正式宣布启动 “用爱传递 更好开始”关爱留守儿童公益项目，联合23个重要合作伙伴，通过中国儿童少年基金会捐赠市场价值总共3500万元的营养品给四川省、云南省、甘肃省等六省有需求的留守儿童，为他们的健康成长提供营养支持。\r\n\r\n据项目由美赞臣中国发起，联同23个重要合作伙伴为留守儿童的健康成长提供营养支持。消费者通过这些合作渠道购买美赞臣750g以上任意产品一罐，美赞臣中国就会捐出价值30元的营养品，最高捐赠市场价值3500万元，并通过中国儿童少年基金会捐赠给四川省、云南省、甘肃省等六省有需求的留守儿童。\r\n\r\n在“健康中国”的战略背景下，农村留守儿童关爱保护和困境儿童保障工作备受国家、社会关注。此前《中国儿童发展纲要（2021—2030年）》出台，对学龄前儿童营养改善工作提出具体要求，更进一步表明中国在解决留守儿童问题上的坚定决心和不懈努力。','“用爱传递 最好开始”公益项目正是在这一背景下发起，旨在为留守儿童创造更好的健康成长营养条件。','1','中国儿童少年基金会','2022-04-20 03:42:40',0,'http://127.0.0.1:8081/TheCharity/images/news05.jpg',0),(7,'北京横山公益基金会启明星公益图书馆计划在河南桐柏县正式启动','启明星公益图书馆计划是北京横山公益基金会在全民阅读、“双减”政策等背景下，针对0～8岁学龄前儿童打造的绘本启蒙阅读公益项目，项目通过实施分龄亲子共读方案，线上线下联动，帮助中国学龄前儿童在阅读黄金期完成阅读习惯养成、亲子关系建立以及文化底色的构建。项目重点进行绘本阅读空间建设，由儿童教育专家团队推荐书单，绘本由传统文化、自我发展、情绪情感、社会交往、启智创想等板块内容组成，分为180个书盒，共计720本绘本。除此之外，项目还提供后续的绘本阅读师资培训及线上指导服务，以及配套的线上服务系统，汇集大量的学习资源和跟踪反馈孩子阅读情况的功能。\r\n\r\n桐柏县教体局党组书记、局长王诗东主持活动。他介绍了活动的渊源和背景，对启明星公益图书馆计划落地桐柏县，助力桐柏县儿童绘本阅读的善举表达了衷心的感谢，并对桐柏县的儿童寄予了美好的希望，希望孩子们能借助此次公益阅读计划，愉快学习，健康成长。\r\n\r\n接着，北京横山公益基金会理事会副理事长文飚讲话，他介绍，北京横山公益基金会自成以来就一直致力于助学助教、扶弱济困、促进文化等公益事业。启明星公益图书馆计划正是基金会为了履行职责、回馈社会而设立的，选择在河南地区启动也是颇有渊源的。今年7月，河南省多地遭受水灾后，北京横山公益基金会立即召开驰援河南的抗洪救灾紧急会议，向河南省慈善总会捐增救灾款10万元，向郑州大学第一附属医院捐赠救灾款25万元。灾情过后，为帮助灾区重建，针对此次洪灾有可能给幼儿带来的心理创伤问题，基金会在河南地区遴选3家有需求的幼儿园，将后续捐款用于启明星公益图书馆计划的落地实施，意在为河南受灾地区的儿童提供绘本阅读空间，营造阅读氛围，抚慰他们的心灵。','12月24日，北京横山公益基金会启明星公益图书馆计划捐赠仪式在河南省桐柏县映山红幼儿园举行。','1','北京横山公益基金会','2022-04-20 00:43:29',0,'http://127.0.0.1:8081/TheCharity/images/news06.jpg',0),(8,'重庆开展“情暖童心 关爱成长”少年儿童系列公益活动','12月24日由市儿童活动中心主办的“情暖童心 关爱成长”少年儿童心理健康系列公益活动，走进开州中学、垫江中学，在三天时间里，专家们将对孩子们进行身心健康体检、心理健康讲座、团体心理辅导等，助力少年儿童全面发展。\r\n\r\n据重医附一院“阳光心语”志愿者服务队在重庆市16个区县、200余所学校、20余万名中小学生中所做的长期调研结果表明，重庆市儿童青少年心理健康状况不容乐观。13.06%的学生存在抑郁症状，22.34%的学生存在焦虑症状，26.34%的学生存在短暂的自杀意念，2.23%的学生存在有严重的自杀意念，1.46%的学生有自杀未遂史。农村贫困地区学生抑郁焦虑情绪发生率显著高于城镇。\r\n\r\n为以实际行动贯彻落实《国务院关于实施健康中国行动的意见》，促进少年儿童心理健康和全面素质发展，重庆市儿童活动中心联合重庆兴秋科技有限公司、重庆市家庭教育研究会开展了“情暖童心 关爱成长”少年儿童心理健康系列公益活动。','通过开展少年儿童心理健康筛查及义诊、举办心理健康教育讲座和团体心理辅导、高危学生长期随访，建立心理动态档案等活动，帮助少年儿童早期识别及处理心理健康问题，正确引导他们养成积极健康生活方式，不断提升我市少年儿童心理健康水平，促进少年儿童综合素质全面发展。','1','市儿童活动中心','2022-04-20 03:44:25',0,'http://127.0.0.1:8081/TheCharity/images/news07.jpg',0),(9,'“HELLO小孩”爱心捐赠走进安平中小','爱心汇聚力量，真情共筑希望。12月17日，安平中小联合安仁县妇联举行了“HELLO小孩”公益项目爱心捐赠仪式，郴州市妇联党组成员谢甜甜、郴州市妇联权益部部长黄莉、安仁县妇联主席张桂兰、安平镇党委副书记谭朝阳、安平镇党委委员、组织委员彭金梅、安平镇人民政府副镇长豆里斯为学校40名同学发放了爱心礼包。\r\n\r\n\r\n\r\n活动中，40名儿童收到了一份装有学习、文体、生活、应急4类必需用品的“HELLO小孩”爱心套餐，孩子们个个兴高采烈，欢欣鼓舞，并纷纷表示将好好学习，成为社会有用之才。\r\n\r\n\r\n\r\n据了解，“HELLO小孩”公益项目是2015年由中国儿童少年基金会组织发起的面向贫困弱势和受自然灾害、突发事故影响的小学阶段儿童的公益救助项目，通过捐赠爱心套餐为需要帮助的儿童送去社会各界的问候和关爱。','安平中小联合安仁县妇联举行了“HELLO小孩”公益项目爱心捐赠仪式，郴州市妇联党组成员谢甜甜、郴州市妇联权益部部长黄莉、安仁县妇联主席张桂兰、安平镇党委副书记谭朝阳、安平镇党委委员、组织委员彭金梅、安平镇人民政府副镇长豆里斯为学校40名同学发放了爱心礼包。\r\n\r\n','3','安平中小联合安仁县妇联','2022-04-17 03:45:19',0,'http://127.0.0.1:8081/TheCharity/images/news08.jpg',0),(10,'枣庄市关爱儿童生殖健康公益活动正式启动 推动孤困儿童帮扶工作落实','12月18日，“与爱童行”枣庄市关爱儿童生殖健康公益活动启动仪式在舜和枣庄大酒店举行，这标志着枣庄市关爱孤困和留守儿童工作持续深入开展，进入了精细化阶段。市关工委常务副主任高庆喜，副主任王亚、市中区区委组织部长李厚兴、市中区关工委主任王真海等领导出席活动。各区（市）关工委、卫健局、民政局分管负责人以及承办协办单位相关人员共计70余人参加了活动，王亚副主任做重要讲话。','这次“与爱童行”关爱儿童生殖健康活动的开展，充分体现了参与部门，参与企业和和社会团体高度的社会责任感！','1','大众网·','2022-04-20 03:46:37',0,'http://127.0.0.1:8081/TheCharity/images/news09.jpg',0),(11,'HELLO小孩公益爱心套餐情暖浏阳泮春中学','“HELLO 小孩”是由中国儿童少年基金会于2015年组织发起的公益项目。主要面向困境儿童和受自然灾害、突发事件等影响的儿童，为他们提供爱心套餐。爱心套餐分为日常套餐和灾后应急套餐两种，标准分别为200元、300元，内含学习、生活、文体、应急4类用品。\r\n\r\n此次公益项目，为每位学生发放了一套价值200元的爱心套餐礼包，包括跳绳、口琴、健康急救包、围巾、保温水杯等18件物品。活动现场，喻可畏校长、喻新平组长和班主任为孩子发放套餐礼包。\r\n\r\n回到教室后，同学们迫不及待地打开礼包，柔软的围巾、各式各样的文具、健康应急包等用品展现在同学们面前，孩子们脸上绽放出了灿烂的笑容，有的同学甚至拿起口琴在现场吹奏起来，喜悦之情溢于言表。精美的礼包就像冬日里的暖阳，温暖着每一个留守儿童的心田。','据悉，套餐礼包发放仪式前，长沙市妇联还为学校的初中部女生发放了“春蕾计划——梦想未来”物资(卫生巾)，女性教师也可以根据自身需要领取。此外，学校在女厕所和女宿舍设置“应急取用点”，长期为在校女生提供贴心服务。','2','AI YOU FOUNDATION','2022-04-18 03:47:29',0,'http://127.0.0.1:8081/TheCharity/images/news10.jpg',0),(12,'阿里健康发起儿童重疾救助计划 开展困境重疾家庭精准帮扶','1月23日，第九届中国公益慈善项目交流展示会（简称“慈展会”）上，阿里健康与中国出生缺陷干预救助基金会、中国社会福利基金会在慈展会上分别签约。中国社会福利基金会与阿里健康公益联合发起小鹿灯-“愈见未来”儿童重疾救助计划。该计划将扩大救助病种，重点针对后天罹患重疾的患儿家庭，在欠发达县域开展重疾儿童的医疗救助，针对困境重疾家庭或个人开展精准帮扶。\r\n\r\n\r\n\r\n近年来，随着国家各项救助体系的不断完善，大大缓解了重疾儿童家庭的医疗经济负担，但由于儿童重疾往往病情复杂、诊治难度高、医疗花费大，患儿家庭医保外的经济负担仍然比较高，导致有些患儿错失最佳救治时机。\r\n\r\n','发展慈善事业，培育慈善组织，发挥第三次分配的作用，对于帮扶困难群体、促进共同富裕、提升社会治理水平意义非凡。“三次分配”为我国推动慈善公益、社会公平和共同富裕道路指明了方向，将缩小地区差距、城乡差距和收入差距，让每个人公平享有发展机会。','1','阿里健康','2022-04-07 03:48:13',0,'http://127.0.0.1:8081/TheCharity/images/news11.jpg',0),(13,'爱佑慈善基金会携手爱奇艺打通爱心壁垒，唤起社会各界对病患儿童的关注之心','1月17日-30日，爱奇艺联合爱佑慈善基金会发起“拨开迷雾，以爱见光”公益活动。在北京地铁西单站的迷雾主题场景中，来往乘客只需要轻按红色按钮，即可“点亮光明”，为病患儿童送上爱心。无法亲临线下的用户，也可通过参与微博话题打卡捐赠爱心。届时线下“点亮光明”的总次数将与线上话题讨论量相结合，将广大用户的爱心凝结为儿童文具和教具送往爱佑慈善基金会全国8地10所医院的爱佑童乐园中，为医务社工开展儿童医疗适应服务提供更丰富多元的道具，守护住院儿童的童年。','在热度延续的基础上，爱奇艺更将厂牌影响力转化为公益行动的号召力，把用户目之所及的关注与热忱倾注于公益行动上，以此带动更多人关注弱势群体，并以实际行动参与其中，成为贡献爱心、汇聚光明的一份子，展现出身在文化创意产业领域的企业的责任与担当。','3','AI YOU FOUNDATION','2022-04-15 03:49:09',0,'http://127.0.0.1:8081/TheCharity/images/news12.jpg',0),(14,'新华书店集团关爱乡村儿童公益活动展现担当与责任','11月23日，新华书店集团“新华关爱 爱与阅读同行”关爱乡村儿童公益活动在利川市柏杨坝镇友好村友好小学举行。\r\n\r\n\r\n\r\n一大早，新华书店集团爱心志愿者们来到学校，为孩子们送上了书包、文具等爱心物资；给孩子们讲竹背篓、铁脚板的故事，鼓励孩子们传承吃苦耐劳精神，从中汲取奋进力量；为孩子们上音乐课、美术课、手工课，引导孩子们开动大脑，培养他们的审美观和想象力。\r\n\r\n\r\n\r\n当天，爱心志愿者和孩子们还共同参加了“新华关爱”趣味运动会，在游戏项目中，互相鼓励、互相支持，拉进了彼此之间的距离，让爱心在游戏中得以传递。','新华书店集团以全省各地新华书店为服务平台，关爱乡村儿童，大力支持乡村教育事业发展，展现了作为国有企业的责任与担当。','2','新华书店','2022-04-18 03:50:02',0,'http://127.0.0.1:8081/TheCharity/images/news13.jpg',0),(15,'小屋大爱，汇聚爱心 共爱困境儿童的人生轨迹','羞涩的脸上挂满欢笑的还有青海海晏县的困境儿童小鑫。父亲2017年因意外导致瘫痪，常年卧床不起，家庭的困境让10岁的小鑫性格变得孤僻，学习成绩优异的他渴望拥有属于自己的小天地。如今，他成了海晏县第一间“希望小屋”的小主人。\r\n\r\n今年以来，为了让民族地区青少年也像山东的孩子一样感受到党的关怀和温暖，共青团山东省委除向对口支援的两地捐赠200万元资金物资外，还将“希望小屋”建设标准、使用管理、志愿服务等整套工作模式倾囊相授。目前，两地的“希望小屋”建设任务已全部完成，140多名藏族、回族、土族、蒙古族等民族的困境儿童住进了自己的新房间，真切享受到了共同富裕的发展成果。\r\n\r\n截至目前，共青团山东省委用一年半的时间募集资金累计超过2.1亿元，已建在建“希望小屋”15036间，1.5万余名困境儿童有了自己的独立学居空间，有了干净的书桌、温暖的小床，有了更多社会爱心人士的关心爱护。','我们有理由相信，随着“希望小屋”这项党政关注、群众认可、青少年期盼的共青团品牌工作扎实开展、有效落地，在为慈善事业打开另一扇窗的同时，将源源不断激发出社会共建“希望小屋”的强大公益力量，谱写出更加温暖动人的共同富裕篇章。','1','AI YOU FOUNDATION','2022-04-06 03:50:53',0,'http://127.0.0.1:8081/TheCharity/images/news14.jpg',0),(16,'爱佑慈善基金会用医疗预备书帮助即将手术的小朋友鼓起勇气面对挑战','爱佑慈善基金会设立患儿专属的“童乐园”儿童活动空间，守护病房里的童年！9岁的彤彤是人生中第一次住院，在妈妈的陪同下，他要住院完成一次先心病手术。从医疗的角度来看，这是一台相对简单的手术：一次性的手术，术后在ICU（重症加强护理病房）中观察两晚，顺利的话一周内就可以出院，三个月左右即可痊愈。\n\n但对于彤彤来说，这个过程可不像想象中那么简单，太多第一次的新鲜体验，都让他很难适应：第一次打留置针，平时胆大勇敢的他哭得前所未有的厉害；第一次抽血，他紧张到一直出汗，衣服都湿透了......更麻烦的是，在紧张情绪之外，他还突然发起了烧，本来预约在周一进行的手术，不得不推迟到周四做.\n\n爱佑童乐园的项目同事和护士长一起去病房里看彤彤的那天，是手术前一天的周三上午。护士长先对彤彤的妈妈进行了术前宣教，让彤彤妈准备好病号服、了解手术前的禁食禁水要求等等。妈妈认真地听着，躺在床上的彤彤也时不时凑过来听一会，更多的是好奇，其实也听不懂太多。\n\n做完家长宣教之后，护士长告诉彤彤和彤彤妈，今天除了术前宣教，爱佑童乐园的老师也来帮彤彤自己做个手术预备。\n\n和彤彤打过招呼后，我们发现他还有一些羞涩，为了更加了解他，也让他更好地投入到预备状态，我们先让他画“我的VIP海报”（点击链接了解“我的VIP海报”详情➡童乐园 | 在医院里，每一个孩子都是VIP），在互相了解的热身活动完成后，我们拿出了《DIY医疗预备书》，邀请彤彤和妈妈一起看，跟着书中的顺序，一起做手术的预备。\n\n在“选一选，哪个表情最像现在的我？”那一页，彤彤选了“哭”的表情。我们问，“要做手术了，所以有一点担心、害怕？“，彤彤点点头。','我们希望每一个要做手术的小朋友，都有机会和自己信任的大人一起，预习将要经历的手术。他们不需要知道具体的手术技术细节，他们想知道的是手术是什么？谁会陪TA一起？具体要经历一些什么？他们可以怎么做让自己不那么害怕。未来，爱佑慈善基金会希望可以与更多伙伴携手，一起关注住院患儿的医疗心理适应，让更多孩子可以自信的说，“原来手术也没什么可怕的！”。','1','爱佑慈善基金会','2022-04-25 10:47:26',1,'http://localhost:8082/Admin/images/9502F34A0C424BE09A7F2A5A32A4A732_newpic.jpg',0);
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '专业技能id',
  `skill_name` varchar(64) NOT NULL COMMENT '专业技能名',
  `description` varchar(128) DEFAULT NULL COMMENT '技能描述',
  `del_flag` int DEFAULT '0' COMMENT '删除标志(0表示未删除1表示删除)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `skill_skill_name_uindex` (`skill_name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='志愿者专业技能表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
INSERT INTO `skill` (`id`, `skill_name`, `description`, `del_flag`) VALUES (1,'医疗技能','会医疗救助',0),(2,'工程监理','代表甲方对乙方的工程建设实施监控的一种专业化服务活动',0),(3,'金融管理','指国家为了实现货币供求平衡、稳定货币值和经济增长等目标而对货币资金所实行的管理',0),(4,'财务审计','按照《中华人民共和国审计法》及其实施条例和国家企业财务审计准则规定的程序和方法对国有企业(包括国有控股企业)资产、负债、损益的真实、合法、效益进行审计监督',0),(5,'摄影摄像','使用某种专门设备进行影像记录的过程',0),(6,'新闻传播','面向全国公开发行的新闻与传播学类专业的省一级期刊',0),(7,'项目管理','指在项目活动中运用专门的知识、技能、工具和方法，使项目能够在有限资源限定条件下，实现或超过设定的需求和期望的过程',0),(8,'计算机','操作常用计算机办公软件',0),(9,'网站管理','网站管理是对网络营销既基础又重要的一个环节，现时大多数中小企业开始重视网络营销，慢慢参与一些培训课程；改建企业网站',0),(10,'外语','拥有流利的英语口听水平',0),(11,'工商管理','市场经济中最常见的一种管理专业，一般指工商企业管理',0),(12,'图文设计','通过计算机技术，将图形（图形、图像）与文字（文字、字体）等设计元素相结合而形成的凝结设计',0);
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_name` varchar(64) NOT NULL COMMENT '用户名',
  `password` varchar(64) NOT NULL COMMENT '密码',
  `type` char(1) NOT NULL DEFAULT '0' COMMENT '0表示普通用户，1表示管路员',
  `nick_name` varchar(64) DEFAULT 'tom' COMMENT '真实名称',
  `sex` char(1) DEFAULT NULL COMMENT '性别',
  `address` varchar(64) DEFAULT '无' COMMENT '住址',
  `occupation` varchar(64) DEFAULT '无' COMMENT '职业',
  `personal_introduction` varchar(1024) DEFAULT '这个人很懒.....，没有留下任何关于个人的介绍' COMMENT '自我介绍',
  `phone_number` varchar(32) DEFAULT '无' COMMENT '手机号',
  `email` varchar(64) NOT NULL COMMENT '邮箱',
  `avatar` varchar(128) DEFAULT 'http://127.0.0.1:8081/TheCharity/images/testimonial-1.jpg' COMMENT '用户头像',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `del_flag` int DEFAULT '0' COMMENT '删除标志（0表示未删除1表示已删除）',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_user_name_uindex` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='用户、管理员表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `user_name`, `password`, `type`, `nick_name`, `sex`, `address`, `occupation`, `personal_introduction`, `phone_number`, `email`, `avatar`, `create_time`, `del_flag`) VALUES (1,'wht123456','123456','0','XXXX','1','四川省成都市金牛区','学生','Your only limit is your soul\n一个正在路上的开发者','13219899635','1369281736@qq.com','http://localhost:8081/TheCharity/images/031B293B53AD4CBCBBDED7EAC1C89116_testimonial-1.jpg','2022-04-14 12:38:06',0),(7,'lq123456','123456','0','李倩','0','四川省成都市郫都区','学生','这个人很懒.....，没有留下任何关于个人的介绍','18980590944','1725453353@qq.com','http://127.0.0.1:8081/TheCharity/images/testimonial-1.jpg','2022-04-20 08:38:30',0),(9,'admin01','123456','1','超级管理员','1','四川省成都市','无','这个人很懒.....，没有留下任何关于个人的介绍','13219899635','1369281736@qq.com','http://127.0.0.1:8082/Admin/images/user2-160x160.jpg','2022-04-23 02:12:05',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volunteer`
--

DROP TABLE IF EXISTS `volunteer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `volunteer` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '志愿者id',
  `name` varchar(64) DEFAULT NULL COMMENT '志愿者真实名字',
  `address` varchar(128) DEFAULT NULL COMMENT '家庭住址',
  `sex` char(1) DEFAULT NULL COMMENT '性别',
  `age` int DEFAULT NULL COMMENT '年龄',
  `email` varchar(64) DEFAULT NULL COMMENT '邮箱',
  `phone_number` varchar(32) DEFAULT NULL COMMENT '手机号',
  `skill_id` bigint DEFAULT NULL COMMENT '专业技能id',
  `create_time` datetime DEFAULT NULL COMMENT '加入志愿者时间',
  `del_flag` int DEFAULT '0' COMMENT '删除标志(0表示未删除1表示删除)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='志愿者表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volunteer`
--

LOCK TABLES `volunteer` WRITE;
/*!40000 ALTER TABLE `volunteer` DISABLE KEYS */;
INSERT INTO `volunteer` (`id`, `name`, `address`, `sex`, `age`, `email`, `phone_number`, `skill_id`, `create_time`, `del_flag`) VALUES (1,'王洪涛','四川省成都市金牛区','1',20,'1369281736@qq.com','13219899635',8,'2022-04-14 09:21:24',0),(2,'李倩','四川省成都市郫都区','0',18,'1735846513@qq.com','18980590944',1,'2022-04-23 22:47:53',0),(3,'李四','四川省成都市武侯区','1',22,'173586522@qq.com','13219899635',7,'2022-04-23 22:52:29',0),(4,'王五','四川省成都市郫都区','1',18,'1735846513@qq.com','13219899635',10,'2022-04-24 10:49:37',0),(5,'李留','四川省成都市郫都区','0',18,'1735846513@qq.com','1312134151',5,'2022-04-24 10:51:23',0);
/*!40000 ALTER TABLE `volunteer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-16 21:34:16
