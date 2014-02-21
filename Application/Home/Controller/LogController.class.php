<?php
// 本类由系统自动生成，仅供测试用途
namespace Home\Controller;
use Think\Controller;
class LogController extends HomeController {
    public function index() {
        //$this->show('<style type="text/css">*{ padding: 0; margin: 0; } div{ padding: 4px 48px;} body{ background: #fff; font-family: "微软雅黑"; color: #333;} h1{ font-size: 100px; font-weight: normal; margin-bottom: 12px; } p{ line-height: 1.8em; font-size: 36px }</style><div style="padding: 24px 48px;"> <h1>:)</h1><p>欢迎使用 <b>ThinkPHP</b>！</p></div><script type="text/javascript" src="http://tajs.qq.com/stats?sId=9347272" charset="UTF-8"></script>','utf-8');
        // echo "Test Index<br/>";
        
        // $this->checkSession();
        $this->display();
    }

    private function checkSession() {
        $user_name = session('username');
        $user_level = session('userlevel');
        
        if(is_null($user_name))
            $this->redirect('Public/login', null, 2, '用户未登录，跳转到登录界面......');
        else if($user_level > 0){
            $this->error('非GM用户，无法使用游戏盒子！');
        }else
            $this->redirect('login', null, 5, '111......');
    }

}
