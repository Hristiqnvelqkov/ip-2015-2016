package ip.java;
import java.util.Scanner;
import java.util.List;
import java.util.LinkedList;
import java.util.Map;
import java.util.HashMap;
public class TextInput {
	public static void main(String[] args){
		List<String> students=new LinkedList<String>();
		Map<String,Integer> entry=new HashMap<String,Integer>();
		System.out.println("enter username");
		System.out.println("login/logout");
		System.out.println("For login press 1 for logout 0");
		Scanner in=new Scanner(System.in);
		String value=in.next();
		in.close();
		int log;
		if(value=="1"){
			log=1;
		}else{
			log=0;
		}
		Scanner ins=new Scanner(System.in);
		String name=ins.next();
		ins.close();
		int inside;
		if(log==1){
			inside=1;
			students.add(name);
			entry.put(name,inside);
		}
		else{
			inside=0;
			students.remove(name);
			entry.put(name,inside);
		}
	}	
	public static int info(String person) throws IllegalArgumentException{
		String split[]=person.split(":");
		if("info"==split[0]){
			return 
		}
		else{
			throw new IllegalArgumentException(person);
		}
	}
}	
