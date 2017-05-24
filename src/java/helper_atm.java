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
public class helper_atm extends HttpServlet {

    public final String retrieve_atm = "0";
    public final String insert_atm = "1";
    public final String update_atm = "2";

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
            out.println("<title>Servlet atm_helper</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet atm_helper at " + request.getContextPath() + "</h1>");
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
        String hasil = null;
        Connection con;
        Statement stmt;
        String Kodeaut = "";
        ResultSet rs;
        CallableStatement st;

        String code = request.getParameter("code");

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conn = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/ticket_management", "root", "indonesia");
            if (code == retrieve_atm) {
                String query = "{call retrieve_atm()}";
                st = conn.prepareCall(query);
                rs = st.executeQuery();
                int i = 0;
                JSONArray jArray = new JSONArray();
                while (rs.next()) {

                    String id_atm = rs.getString("id_atm");
                    String nama_lokasi = rs.getString("nama_lokasi");
                    String nama_atm = rs.getString("nama_atm");
                    String status = rs.getString("status");
                    String kordinator = rs.getString("kordinator");
                    String p_terakhir = rs.getString("p_terakhir");

                    JSONObject arrayObj = new JSONObject();

                    arrayObj.put("id_atm", id_atm);
                    arrayObj.put("nama_lokasi", nama_lokasi);
                    arrayObj.put("nama_atm", nama_atm);
                    arrayObj.put("status", status);
                    arrayObj.put("kordinator", kordinator);
                    arrayObj.put("p_terakhir", p_terakhir);

                    jArray.add(i, arrayObj);
                    i++;
                }
                rs.close();

                hasil = jArray.toString();
                out.print(hasil);
            }

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
