<%@ Page Title="" Language="C#" MasterPageFile="~/Master/WindowMasterPage.master" AutoEventWireup="true" CodeFile="Page_Exam.aspx.cs" Inherits="Pages_Page_Exam" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="content" Runat="Server">
<div id="win_exam_mod_wrapper"  class=" clearfix">
    <div class="wrapper_left" id="mod_laborder_exam"></div>
    <div class="wrapper_right"  id="mod_exam_wrapper"></div>
</div>

<script type="text/javascript" language="javascript">
    require(["../Scripts/main"], function () {
        require(["page_exam"], function (a) { a.show(); });
    });
</script>
</asp:Content>

