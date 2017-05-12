/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
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
public class retrieve_ticket extends HttpServlet {

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
            out.println("<title>Servlet retrieve_ticket</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet retrieve_ticket at " + request.getContextPath() + "</h1>");
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
        response.setContentType("text/html");

        PrintWriter out = response.getWriter();
        String hasil = null;
        Connection con;
        Statement stmt;
        String Kodeaut = "";
        ResultSet rs;
        CallableStatement st;

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conn = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/ticket_management", "root", "indonesia");
            PreparedStatement pst = conn.prepareStatement("Select * from tb_pegawai ");
            rs = pst.executeQuery();
            int i = 0;
            JSONArray jArray = new JSONArray();
            while (rs.next()) {

                String code = rs.getString("id_pegawai");
                String transname = rs.getString("nik");
                String cusname = rs.getString("nama");
                String date = rs.getString("password");
                String addres = rs.getString("jabatan");
                String id = rs.getString("tanggal");

                JSONObject arrayObj = new JSONObject();

                arrayObj.put("code", code);
                arrayObj.put("transname", transname);
                arrayObj.put("cusname", cusname);
                arrayObj.put("date", date);
                arrayObj.put("addres", addres);
                arrayObj.put("id", id);

                jArray.add(i, arrayObj);
                i++;
            }
            rs.close();

            hasil = jArray.toString();
            out.print(hasil);

        } catch (SQLException sx) {
            hasil = sx.toString();
        } catch (ClassNotFoundException cx) {
            hasil = cx.toString();
        }
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
        String hasil = null;
        Connection con;
        Statement stmt;
        String Kodeaut = "";
        ResultSet rs;
        CallableStatement st;

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conn = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/ticket_management", "root", "indonesia");
            String query = "{call retrieve_ticket()}";
            st = conn.prepareCall(query);
            rs = st.executeQuery();
            int i = 0;
            JSONArray jArray = new JSONArray();
            while (rs.next()) {

                String id_pegawai = rs.getString("id_pegawai");
                String nik = rs.getString("nik");
                String nama = rs.getString("nama");
                String id_atm = rs.getString("id_atm");
                String nama_lokasi = rs.getString("nama_lokasi");
                String id_masalah = rs.getString("id_masalah");
                String nama_masalah = rs.getString("nama_masalah");
                String deskripsi = rs.getString("deskripsi");
                String id_ticket = rs.getString("id_ticket");
                String start_time = rs.getString("start_time");
                String end_time = rs.getString("end_time");

                JSONObject arrayObj = new JSONObject();

                arrayObj.put("id_pegawai", id_pegawai);
                arrayObj.put("nik", nik);
                arrayObj.put("nama", nama);
                arrayObj.put("id_atm", id_atm);
                arrayObj.put("nama_lokasi", nama_lokasi);
                arrayObj.put("id_masalah", id_masalah);
                arrayObj.put("nama_masalah", nama_masalah);
                arrayObj.put("deskripsi", deskripsi);
                arrayObj.put("id_ticket", id_ticket);
                arrayObj.put("start_time", start_time);
                arrayObj.put("end_time", end_time);

                jArray.add(i, arrayObj);
                i++;
            }
            rs.close();

            hasil = jArray.toString();
            out.print(hasil);

        } catch (SQLException sx) {
            hasil = sx.toString();
        } catch (ClassNotFoundException cx) {
            hasil = cx.toString();
        }
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
