<%@ Page Title="" Language="C#" MasterPageFile="~/Master/WindowMasterPage.master" AutoEventWireup="true" CodeFile="Page_PregnancyHistory.aspx.cs" Inherits="Pages_Page_PregnancyHistory" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="content" Runat="Server">
<div id="win_pregnancyhistory_mod_wrapper" class=" clearfix">
    <div class="wrapper_left">
        <div id="wrapper_left_pregnantcyhistory" ></div>
    </div>
    <div id="wrapper_right_pregnantcyhistory" class="wrapper_right">
    </div>
</div>
<script type="text/javascript" language="javascript">
    require(["../Scripts/main"], function () {
        require(["page_pregnancyhistory"], function (a) { a.show(); });
    });
</script>
</asp:Content>

