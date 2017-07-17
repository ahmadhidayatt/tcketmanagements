/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 *
 * @author ahmad
 */
public class helper_ticket extends HttpServlet {

    public final String insert_ticket = "1";
    public final String update_ticket = "2";
    public final String retrieve_id = "3";
    private Connection conn;

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet ticket_helper</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ticket_helper at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");

        PrintWriter out = response.getWriter();
        conn = new connection().getConn();
        String hasil = null;
        Statement stmt;
        String Kodeaut = "";
        ResultSet rs;
        Statement st;

        String code = request.getParameter("code");

        try {
            if (code.equals(insert_ticket)) {
                out.print(code);
                String id_atm = request.getParameter("id_atm");
                String id_masalah = request.getParameter("id_masalah");
                String atm_name = request.getParameter("atm_name");
                String atm_klien = request.getParameter("atm_klien");
                String custody = request.getParameter("custody");
                String nik = request.getParameter("nik");
                String satwal = request.getParameter("satwal");
                String kartu_tertelan = request.getParameter("kartu_tertelan");

                String query = "insert into tb_ticket(id_atm,id_masalah,status,custody,nik,satwal,kartu_tertelan)values(?,?,?,?,?,?,?)";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setString(1, id_atm);
                statement.setString(2, id_masalah);
                statement.setString(3, "open");
                statement.setString(4, custody);
                statement.setString(5, nik);
                statement.setString(6, satwal);
                statement.setString(7, kartu_tertelan);
                statement.executeUpdate();
                hasil = "sukses";

            } else if (code.equals(update_ticket)) {
                out.print(code);

                String id_ticket = request.getParameter("id_ticket");
                String id_atm = request.getParameter("id_atm");
                String id_masalah = request.getParameter("id_masalah");
                String start_time = request.getParameter("start_time");
                String end_time = request.getParameter("end_time");
                String custody = request.getParameter("custody");
                String nik = request.getParameter("nik");
                String satwal = request.getParameter("satwal");
                String kartu_tertelan = request.getParameter("kartu_tertelan");
                String deskripsi = request.getParameter("deskripsi");
                String status = request.getParameter("status");

                String query = "update tb_ticket set id_atm=?,id_masalah=?,start_time=?,end_time=?,nik=?,satwal=?,kartu_tertelan=?,deskripsi=?,status=?,custody=? where id_ticket =?";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setString(1, id_atm);
                statement.setString(2, id_masalah);
                statement.setString(3, start_time);
                statement.setString(4, end_time);
                statement.setString(5, nik);
                statement.setString(6, satwal);
                statement.setString(7, kartu_tertelan);
                statement.setString(5, deskripsi);
                statement.setString(6, status);
                statement.setString(7, custody);
                statement.setString(7, id_ticket);
                statement.executeUpdate();
                hasil = "sukses";

            } else if (code.equals(retrieve_id)) {
                String id_tickets = request.getParameter("id_ticket");
                String query = "SELECT d.id_ticket,b.nama_atm,c.nama_masalah,d.start_time,d.end_time,d.nik,d.satwal,d.kartu_tertelan,d.deskripsi,d.status,d.custody\n"
                        + "FROM tb_ticket d\n"
                        + "INNER JOIN tb_pegawai a ON d.nik = a.nik\n"
                        + "INNER JOIN tb_atm     b ON  b.id_atm = d.id_atm\n"
                        + "INNER JOIN tb_masalah  c ON c.id_masalah   = d.id_masalah where id_ticket = "+id_tickets;
          
                stmt = conn.createStatement( );
                rs = stmt.executeQuery(query);
                int i = 0;
                JSONArray jArray = new JSONArray();
                while (rs.next()) {

                    String id_ticket = rs.getString("id_ticket");
                    String nama_atm = rs.getString("nama_atm");
                    String nama_masalah = rs.getString("nama_masalah");
                    String start_time = rs.getString("start_time");
                    String end_time = rs.getString("end_time");

                    String nik = rs.getString("nik");
                    String satwal = rs.getString("satwal");

                    String kartu_tertelan = rs.getString("kartu_tertelan");
                    String deskripsi = rs.getString("deskripsi");
                    String status = rs.getString("status");
                    String custody = rs.getString("custody");

                    JSONObject arrayObj = new JSONObject();

                    arrayObj.put("id_ticket", id_ticket);
                    arrayObj.put("nama_atm", nama_atm);
                    arrayObj.put("nama_masalah", nama_masalah);
                    arrayObj.put("start_time", start_time);
                    arrayObj.put("end_time", end_time);
                    arrayObj.put("nik", nik);
                    arrayObj.put("satwal", satwal);

                    arrayObj.put("kartu_tertelan", kartu_tertelan);
                    arrayObj.put("deskripsi", deskripsi);
                    arrayObj.put("status", status);
                    arrayObj.put("custody", custody);

                    jArray.add(i, arrayObj);
                    i++;
                }

//                statement.setString(1, id_atm);
//                statement.setString(2, id_masalah);
//                statement.setString(3, start_time);
//                statement.setString(4, end_time);
//                statement.setString(5, nik);
//                statement.setString(6, satwal);
//                statement.setString(7, kartu_tertelan);
//                 statement.setString(5, deskripsi);
//                statement.setString(6, status);
//                statement.setString(7, custody);
//                 statement.setString(7, id_ticket);
                
                hasil = jArray.toString();

            }

            conn.close();
        } catch (SQLException sx) {
            hasil = sx.toString();
        }
        out.print(hasil);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
