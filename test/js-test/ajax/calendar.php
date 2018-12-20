<?php
//calendar.php
//检查月份值和年份值是否存在。

if (!isset($month)&&!isset($year)) {
    $month = date("n");
    $year = date("Y");
}
//计算所查看的月份。
$timestamp = mktime(0, 0, 0, $month, 1, $year);
$monthname = date("F", $timestamp);
//现在基于适当的月份创建表格。
?>
<table style="width:105px ; border­collapse: collapse ;" border="1" cellpadding="3" cellspacing="0"
       bordercolor="#000000">
    <tr style="background: #FFBC37;">
        <td colspan="7" style="text­align: center ;" onmouseover="this.style.background='#FECE6E'"
            onmouseout="this.style.background='#FFBC37'">
            <span style="font­weight: bold ;"><?php echo $monthname . " " . $year; ?></span>
        </td>
    </tr>
    <tr style="background: #FFBC37 ;">
        <td style="text­align: center ; width: 15px ;" onmouseover="this.style.background='#FECE6E'"
            onmouseout="this.style.background='#FFBC37'">
            <span style="font­weight: bold ;">Su</span>
        </td>
        <td style="text­align: center ; width: 15px ;" onmouseover="this.style.background='#FECE6E'"
            onmouseout="this.style.background='#FFBC37'">
            <span style="font­weight: bold ;">M</span>
        </td>
        <td style="text­align: center ; width: 15px ;" onmouseover="this.style.background='#FECE6E'"
            onmouseout="this.style.background='#FFBC37'">
            <span style="font­weight: bold ;">Tu</span>
        </td>
        <td style="text­align: center ; width: 15px ;" onmouseover="this.style.background='#FECE6E'"
            onmouseout="this.style.background='#FFBC37'">
            <span style="font­weight: bold ;">W</span>
        </td>
        <td style="text­align: center ; width: 15px ;" onmouseover="this.style.background='#FECE6E'"
            onmouseout="this.style.background='#FFBC37'">
            <span style="font­weight: bold ;">Th</span>
        </td>
        <td style="text­align: center ; width: 15px ;" onmouseover="this.style.background='#FECE6E'"
            onmouseout="this.style.background='#FFBC37'">
            <span style="font­weight: bold ;">F</span
            ></td>
        <td style="text­align: center ; width: 15px ;" onmouseover="this.style.background='#FECE6E'"
            onmouseout="this.style.background='#FFBC37'">
            <span style="font­weight: bold ;">Sa</span>
        </td>
    </tr>

    <?php
    $monthstart = date("w", $timestamp);
    $lastday = date("d", mktime(0, 0, 0, $month + 1, 0, $year));
    $startdate = -$monthstart;
    //计算出所需的行数。
    $numrows = ceil(((date("t", mktime(0, 0, 0, $month + 1, 0, $year)) + $monthstart) / 7));
    //创建适当的行数……
    for ($k = 1; $k <= $numrows; $k++) {
        ?>
        <tr>
            <?php //使用7列(表示7天)……
            for ($i = 0; $i < 7; $i++) {
                $startdate++;
                if (($startdate <= 0) || ($startdate > $lastday)) {  //如果在日历中有空白的格子。
                    ?>
                    <td style="background: #FFFFFF ;">&nbsp ;
                    </td>
                    <?php
                } else {
                    if ($startdate == date("j") && $month == date("n") && $year == date("Y")) {
                        ?>
                        <td style="text­align: center ; background: #FFBC37 ;"
                            onmouseover="this.style.background='#FECE6E'"
                            onmouseout="this.style.background='#FFBC37'"><?php
                        echo date("j"); ?></td><?php } else {
                        ?>
                        <td style="text­align: center ; background: #A2BAFA ;"
                            onmouseover="this.style.background='#CAD7F9'"
                            onmouseout="this.style.background='#A2BAFA'"><?php
                        echo $startdate; ?></td><?php }
                }
            } ?>
        </tr>
        <?php

    } ?>
</table>